# ML Pipeline — Deep Technical Groundwork

This document covers everything you need to understand before we write a single line of training code. When you're ready to implement, we'll use this as the blueprint.

---

## 1. EMSCAD Dataset Deep-Dive

### 1.1 Column Analysis & Fraud Correlation

The EMSCAD dataset has **17 columns**. Here's how each one relates to fraud detection:

#### High-Signal Columns (directly predictive)

| Column | Type | Why It Matters |
|--------|------|---------------|
| `description` | Text | **Primary text input.** Fraudulent posts use vague, hype-driven language ("earn money fast", "no experience needed"). Legitimate posts have specific role details, tech stacks, team structures |
| `company_profile` | Text | **Strongest structural signal.** ~84% of fraudulent postings have an EMPTY company profile vs only ~9% of legitimate ones. A missing company profile is the single best fraud predictor |
| `has_company_logo` | Binary | Legitimate companies nearly always have logos. ~70% of fraudulent posts lack logos |
| `has_questions` | Binary | Screening questions indicate a real hiring pipeline. ~83% of fraudulent posts have no questions |
| `requirements` | Text | Fraud posts tend to have vague/no requirements. Legitimate posts list specific skills |

#### Medium-Signal Columns

| Column | Type | Why It Matters |
|--------|------|---------------|
| `salary_range` | Text | Often missing in fraud posts (they promise "unlimited income" instead of stating a range) |
| `employment_type` | Categorical | Fraud posts disproportionately use "Other" or leave it blank |
| `required_experience` | Categorical | Fraud posts often say "Not Applicable" or leave blank |
| `required_education` | Categorical | Fraud tends to say "Unspecified" — real jobs usually state a requirement |
| `telecommuting` | Binary | Slightly higher fraud rate in remote-only positions |
| `benefits` | Text | Fraud posts either omit benefits or list unrealistic ones |

#### Low-Signal / Noise Columns

| Column | Type | Why |
|--------|------|-----|
| `title` | Text | Too varied, hard to generalize (but keyword signals like "home-based" are useful) |
| `location` | Text | Some geographical patterns, but too sparse to be reliable |
| `department` | Text | Often empty in both classes |
| `industry` | Categorical | Slight patterns but not strong enough to rely on |
| `function` | Categorical | Similar to industry — weak signal |

### 1.2 Class Distribution Reality

```
Total:       17,880 postings
Legitimate:  17,014  (95.16%)
Fraudulent:     866  ( 4.84%)

Imbalance Ratio: ~19.6 : 1
```

This means:
- A model that **always predicts "legitimate"** gets **95.16% accuracy** — completely useless
- We MUST use imbalance-aware metrics (F1, PR-AUC, Recall)
- We MUST use imbalance-handling techniques (SMOTE, class weights)

### 1.3 Data Quality Issues to Handle

```
1. Missing values     — Many text columns are NaN (especially company_profile, benefits)
2. HTML tags          — description/requirements often contain raw HTML
3. Unicode artifacts  — Non-ASCII characters, bullet point encodings
4. Duplicate postings — ~200 near-duplicates exist
5. URL artifacts      — Embedded URLs in text that add noise
```

Your existing `TextPreprocessor` already handles issues 2, 4, and 5. We'll need to add NaN handling in the data loader.

---

## 2. Why XGBoost — Technical Deep-Dive

### 2.1 How XGBoost Works (for this task)

```
                        Training Data
                             │
                    ┌────────┴────────┐
                    │  Tree 1 (weak)  │ ← learns from raw errors
                    └────────┬────────┘
                             │ residuals
                    ┌────────┴────────┐
                    │  Tree 2 (weak)  │ ← learns from Tree 1's mistakes
                    └────────┬────────┘
                             │ residuals
                    ┌────────┴────────┐
                    │  Tree N (weak)  │ ← learns from cumulative mistakes
                    └────────┬────────┘
                             │
                     Final Prediction
                 (sum of all tree outputs)
```

Unlike Random Forest (which builds independent trees and averages), XGBoost builds trees **sequentially** — each new tree focuses specifically on the mistakes the previous trees made. This is why it handles minority classes better: fraud samples that keep getting misclassified get progressively higher attention.

### 2.2 Key Hyperparameters Explained

```python
XGBClassifier(
    n_estimators=200,        # Number of boosting rounds (trees)
                              # More = better fit, but slower + risk of overfit
                              # 200 is a good starting point for 17K samples

    max_depth=6,              # Max tree depth
                              # Lower than RF's 20 — XGBoost trees are weaker by design
                              # 6 prevents overfitting while capturing patterns

    learning_rate=0.1,        # Step size shrinkage
                              # Lower = more conservative, needs more trees
                              # 0.1 is the standard default

    min_child_weight=5,       # Minimum sum of instance weight in a child
                              # Higher = more conservative (prevents fitting noise)
                              # 5 is good for our dataset size

    subsample=0.8,            # Random fraction of training data per tree
                              # Prevents overfitting, adds randomness

    colsample_bytree=0.8,    # Random fraction of features per tree
                              # Similar to RF's max_features

    scale_pos_weight=19.6,   # KEY: ratio of negative/positive samples
                              # Tells XGBoost: "a fraud misclassification
                              # costs 19.6x more than a legit misclassification"

    reg_alpha=0.1,            # L1 regularization (sparsity)
    reg_lambda=1.0,           # L2 regularization (smoothness)

    random_state=42,          # Reproducibility
    n_jobs=-1,                # Use all CPU cores
    eval_metric='aucpr',      # Optimize for Precision-Recall AUC during training
)
```

### 2.3 XGBoost vs Random Forest — Side by Side

| Aspect | Random Forest (current) | XGBoost (proposed) |
|--------|------------------------|-------------------|
| **Tree building** | Independent, parallel trees | Sequential, each corrects previous |
| **Handling imbalance** | Needs external SMOTE or class_weight | Native `scale_pos_weight` + SMOTE |
| **Regularization** | Only via max_depth, min_samples | L1/L2 reg + learning rate + subsampling |
| **Feature importance** | Mean decrease impurity | Gain, weight, cover + SHAP |
| **Sparse data (TF-IDF)** | OK but not optimized | Natively optimized for sparse matrices |
| **API compatibility** | `sklearn` native | `sklearn`-compatible wrapper |
| **Inference speed** | Fast | Slightly faster (optimized traversal) |

---

## 3. Feature Engineering — Complete Blueprint

### 3.1 Text Feature Pipeline

```
Raw Text Input
    │
    ├── description (primary — always present)
    ├── requirements (often present)
    ├── company_profile (often missing in fraud)
    └── benefits (sometimes present)
    │
    ▼
COMBINE: "description + requirements + company_profile + benefits"
    (NaN → empty string, then concatenate)
    │
    ▼
PREPROCESS (existing TextPreprocessor):
    ├── lowercase
    ├── strip HTML tags
    ├── remove URLs
    ├── remove special characters/digits
    ├── remove stopwords (NLTK English)
    └── Porter stemming
    │
    ▼
TF-IDF VECTORIZATION:
    ├── max_features=5000 (cap vocabulary)
    ├── ngram_range=(1,2) (unigrams + bigrams)
    ├── max_df=0.85 (ignore terms in >85% of docs)
    ├── min_df=2 (ignore terms appearing only once)
    └── sublinear_tf=True (apply log normalization)
    │
    ▼
OUTPUT: Sparse matrix [n_samples × 5000]
```

**Why these TF-IDF settings?**
- **5000 features**: Enough to capture fraud-specific vocabulary without curse of dimensionality. Going beyond 10K shows diminishing returns on this dataset
- **Bigrams**: Catches phrases like "work_from" + "home", "no_experience" that unigrams miss
- **85% max_df**: Removes words that appear in nearly every posting (like "job", "position") — they don't discriminate
- **min_df=2**: Removes ultra-rare words (typos, company-specific jargon) that cause overfitting
- **sublinear_tf**: Uses `1 + log(tf)` instead of raw count, preventing long posts from dominating

### 3.2 Structural Metadata Features (NEW)

These are the features we'll extract from raw columns BEFORE combining with TF-IDF:

```python
# Feature 1: has_company_profile (STRONGEST predictor)
# ~84% of fraud posts have NO company profile
has_company_profile = 0 if pd.isna(row['company_profile']) or row['company_profile'].strip() == '' else 1

# Feature 2: has_salary_range
# Legit companies usually state compensation
has_salary_range = 0 if pd.isna(row['salary_range']) or row['salary_range'].strip() == '' else 1

# Feature 3: has_company_logo (from dataset)
has_company_logo = int(row['has_company_logo'])  # already 0/1

# Feature 4: has_questions (from dataset)
has_questions = int(row['has_questions'])  # already 0/1

# Feature 5: telecommuting (from dataset)
telecommuting = int(row['telecommuting'])  # already 0/1

# Feature 6: description_word_count
# Fraud posts tend to be shorter or excessively repetitive
description_word_count = len(str(row['description']).split())

# Feature 7: description_char_length
description_char_length = len(str(row['description']))

# Feature 8: requirements_word_count
# Fraud posts often have no/vague requirements
requirements_word_count = len(str(row.get('requirements', '')).split())
```

### 3.3 Keyword Risk Features (from existing KeywordDetector)

```python
# Feature 9: keyword_risk_score
# Uses existing KeywordDetector.get_risk_contribution()
# Returns 0.0-1.0 based on suspicious keyword density
keyword_risk_score = keyword_detector.get_risk_contribution(text.lower())

# Feature 10: keyword_category_count
# How many suspicious categories were triggered (0-6)
detected = keyword_detector.detect_keywords(text.lower())
keyword_category_count = len(detected)
```

### 3.4 Final Combined Feature Matrix

```
┌──────────────────────┬──────────────────────┬───────────────────┐
│  TF-IDF Features     │  Structural Features │  Keyword Features │
│  (5000 sparse cols)  │  (8 dense cols)      │  (2 dense cols)   │
├──────────────────────┼──────────────────────┼───────────────────┤
│  [0.0, 0.12, 0.0,    │  [1, 0, 1, 1, 0,     │  [0.15, 2]        │
│   0.0, 0.08, ...]    │   142, 847, 38]      │                   │
└──────────────────────┴──────────────────────┴───────────────────┘
                         ↓ scipy.sparse.hstack
                 Combined matrix: [n_samples × 5010]
```

We use `scipy.sparse.hstack` to efficiently combine the sparse TF-IDF matrix with the dense structural features (converted to sparse) without materializing a huge dense array.

---

## 4. Class Imbalance — How SMOTE Works

### 4.1 The Problem

```
Without balancing:

Training data:  17,014 legit  vs  866 fraud
                   ████████████████████░

Model learns:  "Just predict legit every time → 95.16% accuracy!"
Result:         Catches ZERO fraud. Useless.
```

### 4.2 How SMOTE Fixes It

SMOTE (Synthetic Minority Oversampling Technique) creates **synthetic fraud samples** by interpolating between existing fraud samples:

```
Step 1: Pick a fraud sample (point A)
Step 2: Find its K nearest fraud neighbors (default K=5)
Step 3: Pick one neighbor (point B)
Step 4: Create a new synthetic sample somewhere on the line between A and B:
        synthetic = A + random(0,1) × (B - A)

Repeat until fraud class has same count as legit class.
```

```
Before SMOTE:       After SMOTE:
● ● ● ● ● ● ●     ● ● ● ● ● ● ●
● ● ● ● ● ● ●     ● ● ● ● ● ● ●
● ● ● ● ○         ● ● ● ● ○ ○ ○
                    ○ ○ ○ ○ ○ ○ ○

● = legitimate       ○ = fraudulent (real + synthetic)
```

### 4.3 Combined Strategy: SMOTE + scale_pos_weight

```
Step 1: Train/test split (80/20, stratified)
Step 2: Apply SMOTE on training set ONLY
Step 3: Train XGBoost with scale_pos_weight=19.6 as additional cost-sensitivity
Step 4: Evaluate on ORIGINAL (unmodified) test set
```

Why both? SMOTE gives the model more fraud examples to learn from. `scale_pos_weight` makes the model's loss function penalize fraud misclassification 19.6× more. Together they're more effective than either alone.

> **Critical rule**: SMOTE is NEVER applied to test data. The test set must remain untouched to reflect real-world distribution.

---

## 5. Evaluation Framework

### 5.1 Why Accuracy Is Misleading

```
Scenario: Model always predicts "legitimate"
  Accuracy:   95.16%  ← Looks great!
  Precision:  0.00%   ← Never identified any fraud
  Recall:     0.00%   ← Missed every single fraud
  F1-Score:   0.00%   ← Useless
```

### 5.2 Metrics We'll Track

| Metric | Formula | What It Tells Us |
|--------|---------|------------------|
| **Precision (fraud)** | TP / (TP + FP) | "When we flag fraud, how often are we right?" |
| **Recall (fraud)** | TP / (TP + FN) | "Of all real fraud, how much did we catch?" |
| **F1-Score (fraud)** | 2 × (P × R) / (P + R) | Harmonic mean — our **primary metric** |
| **PR-AUC** | Area under Precision-Recall curve | Overall model quality for imbalanced data |
| **ROC-AUC** | Area under ROC curve | Good but less informative than PR-AUC here |

### 5.3 Confusion Matrix Interpretation

```
                    Predicted
                 Legit    Fraud
Actual  Legit  [  TN   |  FP  ]    FP = False alarm (legit flagged as fraud)
        Fraud  [  FN   |  TP  ]    FN = Missed fraud (DANGEROUS)

For our use case:
  - FN (missed fraud) is WORSE than FP (false alarm)
  - We'd rather over-flag suspicious posts than miss real scams
  - This is why recall matters more than precision in our context
```

### 5.4 Expected Performance Targets

| Metric | Target | Explanation |
|--------|--------|-------------|
| F1 (fraud) | ≥ 0.90 | Published baselines achieve 0.88–0.95 |
| Recall (fraud) | ≥ 0.85 | We want to catch at least 85% of scams |
| Precision (fraud) | ≥ 0.88 | Keep false alarms below ~12% |
| PR-AUC | ≥ 0.92 | Strong overall discrimination |

---

## 6. Training Pipeline Architecture

### Complete Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    train.py                          │
│                                                     │
│  1. LOAD DATA                                       │
│     data_loader.load_dataset("data/fake_job.csv")   │
│         → DataFrame (17,880 rows × 17 cols)         │
│                                                     │
│  2. PREPROCESS TEXT                                  │
│     TextPreprocessor.preprocess(combined_text)       │
│         → cleaned text strings                      │
│                                                     │
│  3. ENGINEER FEATURES                               │
│     feature_engineer.build_features(df)             │
│         → structural features (n × 10)              │
│                                                     │
│  4. TRAIN/TEST SPLIT (80/20, stratified)            │
│     X_train, X_test, y_train, y_test                │
│                                                     │
│  5. FIT TF-IDF on X_train text only                 │
│     FeatureExtractor.fit_transform(train_texts)     │
│         → sparse matrix (train × 5000)              │
│     FeatureExtractor.transform(test_texts)          │
│         → sparse matrix (test × 5000)               │
│                                                     │
│  6. COMBINE FEATURES                                │
│     hstack([tfidf_matrix, structural_features])     │
│         → combined matrix (n × 5010)                │
│                                                     │
│  7. APPLY SMOTE on training set only                │
│     SMOTE().fit_resample(X_train_combined, y_train) │
│                                                     │
│  8. TRAIN XGBoost                                   │
│     classifier.fit(X_train_resampled, y_resampled)  │
│                                                     │
│  9. EVALUATE on original test set                   │
│     metrics = evaluate(classifier, X_test, y_test)  │
│                                                     │
│  10. SAVE ARTIFACTS                                 │
│      → models/tfidf_vectorizer.pkl                  │
│      → models/classifier.pkl                        │
│      → models/training_metrics.json                 │
└─────────────────────────────────────────────────────┘
```

---

## 7. Integration Map — What Changes Where

### New Files (4)

| File | Purpose |
|------|---------|
| `app/ml/data_loader.py` | Load CSV, handle NaN, combine text columns |
| `app/ml/feature_engineer.py` | Build 10 structural+keyword features |
| `app/ml/train.py` | Orchestrate full training pipeline |
| `data/fake_job_postings.csv` | EMSCAD dataset |

### Modified Files (4)

| File | What Changes |
|------|-------------|
| `app/ml/classifier.py` | `RandomForestClassifier` → `XGBClassifier`, update hyperparameters |
| `app/ml/feature_extractor.py` | Add `fit_transform()` for training mode (currently only has `transform()`) |
| `app/ml/pipeline.py` | The `analyze()` method needs to also compute structural features at inference |
| `app/constants/ml_constants.py` | Replace RF constants with XGBoost constants |

### Unchanged Files (everything else)

The `MLPipeline.analyze(job_description) → Dict` API stays identical. Routes, services, schemas — zero changes. The inference path just gets better model files.

---

## 8. Common Pitfalls to Avoid

### Pitfall 1: Data Leakage via SMOTE
```
❌ WRONG:
   smote(entire_dataset) → split(train, test)
   // Synthetic samples from training data appear in test set

✅ RIGHT:
   split(train, test) → smote(train_only) → evaluate(test)
```

### Pitfall 2: Fitting TF-IDF on Test Data
```
❌ WRONG:
   vectorizer.fit_transform(ALL_data)  // test vocabulary leaks into vectorizer

✅ RIGHT:
   vectorizer.fit_transform(train_data)
   vectorizer.transform(test_data)     // only transform, never fit on test
```

### Pitfall 3: The Accuracy Trap
```
❌ WRONG:
   "Our model achieves 96% accuracy!" (while catching 0% of fraud)

✅ RIGHT:
   "Our model achieves 91% F1-score on the fraud class,
    with 88% precision and 94% recall"
```

### Pitfall 4: Ignoring Feature Alignment at Inference
```
❌ WRONG:
   Training uses 5010 features (TF-IDF + structural)
   Inference only sends TF-IDF → dimension mismatch crash

✅ RIGHT:
   Both training and inference build the same feature vector:
   [TF-IDF(5000)] + [structural(8)] + [keyword(2)] = 5010
```

### Pitfall 5: Not Handling Missing Structural Features at Inference
```
At inference, we only receive job_description text.
We DON'T have has_company_logo, has_questions, salary_range etc.

Solution: Use sensible defaults for missing structural features:
  - has_company_profile → derive from text length (if < 10 chars → 0)
  - has_salary_range → 0 (assume missing)
  - has_company_logo → 0 (assume missing)
  - has_questions → 0 (assume missing)
  - telecommuting → 0 (assume missing)
  - description_word_count → compute from input text
  - description_char_length → compute from input text
  - requirements_word_count → 0 (not provided separately)

This "assume worst case" approach is actually correct for our use case:
if someone pastes a random job description without metadata, the model
should be MORE suspicious, not less.
```

---

## Summary

When you're ready to implement, we have a clear blueprint:

1. **Download** EMSCAD CSV from Kaggle
2. **Build** data_loader.py, feature_engineer.py, train.py (3 new files)
3. **Modify** classifier.py (RF→XGBoost), feature_extractor.py (add fit_transform), pipeline.py (structural features), ml_constants.py (hyperparams)
4. **Run** training → get `.pkl` artifacts
5. **Verify** inference works with existing API

Just say the word and we start coding. 🚀
