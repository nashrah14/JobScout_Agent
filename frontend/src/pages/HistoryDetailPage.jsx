/**
 * History Detail Page Component.
 *
 * Displays detailed verification results for a single record.
 * Redesigned for JobScout Agent's trust-first AI fake-job detection platform.
 */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "../hooks/useHistory";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";

import HistoryHeader from "../components/history/HistoryHeader";
import ScoreSection from "../components/history/ScoreSection";
import ReasonsSection from "../components/history/ReasonsSection";
import RecommendationsSection from "../components/history/RecommendationsSection";
import EvidenceSection from "../components/history/EvidenceSection";
import MetadataSection from "../components/history/MetadataSection";

import { getVerdictColor } from "../utils/formatters";

export default function HistoryDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { isAuthenticated, loading: authLoading } = useAuth();
    const { loading, loadDetail } = useHistory();

    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    /* ================================================================
       AUTHENTICATION
    ================================================================= */

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [authLoading, isAuthenticated, navigate]);

    /* ================================================================
       LOAD VERIFICATION DETAIL
    ================================================================= */

    useEffect(() => {
        if (!isAuthenticated || !id) {
            return;
        }

        async function fetchHistoryDetail() {
            try {
                setError(null);

                const response = await loadDetail(id);
                setDetail(response);
            } catch (err) {
                setError(
                    err?.customMessage ||
                        "Failed to load verification details."
                );
            }
        }

        fetchHistoryDetail();
    }, [id, isAuthenticated, loadDetail]);

    /* ================================================================
       AUTH LOADING
    ================================================================= */

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] px-4 py-10">
                <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-8 py-10 shadow-sm">
                        <Spinner message="Checking authentication..." />
                    </div>
                </div>
            </div>
        );
    }

    /* ================================================================
       ERROR STATE
    ================================================================= */

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center">
                    <div className="w-full overflow-hidden rounded-2xl border border-[#FECACA] bg-white shadow-sm">

                        {/* Error header */}
                        <div className="border-b border-[#FEE2E2] bg-[#FEF2F2] px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEE2E2] text-[#EF4444]">
                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M10.3 3.2 2.2 17a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0Z" />
                                        <path d="M12 9v4" />
                                        <path d="M12 17h.01" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                                        Verification Error
                                    </p>

                                    <h2 className="mt-0.5 text-lg font-bold text-[#0F172A]">
                                        Unable to load report
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Error body */}
                        <div className="px-6 py-10 text-center sm:px-10">

                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#EF4444]">
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 9v4" />
                                    <path d="M12 17h.01" />
                                    <path d="M10.3 3.2 2.2 17a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0Z" />
                                </svg>
                            </div>

                            <h2 className="text-xl font-bold text-[#0F172A]">
                                Verification Not Found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
                                {error}
                            </p>

                            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate("/history")}
                                    className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 font-semibold text-[#0F172A] hover:bg-[#F8F9FA]"
                                >
                                    ← Back to History
                                </Button>

                                <Button
                                    onClick={() => window.location.reload()}
                                    className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-semibold text-white hover:bg-[#1D4ED8]"
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ================================================================
       DETAIL LOADING
    ================================================================= */

    if (loading || !detail) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] px-4 py-10">
                <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-10 py-10 shadow-sm">
                        <Spinner message="Loading verification details..." />
                    </div>
                </div>
            </div>
        );
    }

    /* ================================================================
       VERDICT INFORMATION
    ================================================================= */

    const verdict = detail?.verdict || "Unknown";
    const verdictLower = verdict.toLowerCase();

    const verdictColor = getVerdictColor(verdict);

    const isFraudulent =
        verdictLower === "fraudulent" ||
        verdictLower === "fraud" ||
        verdictLower === "fake";

    const isSuspicious = verdictLower === "suspicious";

    const isSafe =
        verdictLower === "safe" ||
        verdictLower === "legitimate" ||
        verdictLower === "verified";

    let verdictBg = "#F8FAFC";
    let verdictBorder = "#CBD5E1";
    let verdictText = "#475569";
    let verdictIcon = "○";
    let verdictDescription =
        "Review the verification report and supporting evidence before making a decision.";

    if (isSafe) {
        verdictBg = "#ECFDF5";
        verdictBorder = "#A7F3D0";
        verdictText = "#047857";
        verdictIcon = "✓";
        verdictDescription =
            "This job appears to be legitimate based on the available verification signals.";
    } else if (isSuspicious) {
        verdictBg = "#FFFBEB";
        verdictBorder = "#FDE68A";
        verdictText = "#B45309";
        verdictIcon = "!";
        verdictDescription =
            "Some risk indicators were detected. Review the evidence carefully before applying.";
    } else if (isFraudulent) {
        verdictBg = "#FEF2F2";
        verdictBorder = "#FECACA";
        verdictText = "#B91C1C";
        verdictIcon = "!";
        verdictDescription =
            "Multiple high-risk indicators were detected. Exercise extreme caution with this opportunity.";
    }

    const finalScore =
        typeof detail?.final_score === "number"
            ? detail.final_score
            : null;

    const scorePercentage =
        finalScore !== null
            ? Math.min(Math.max(finalScore * 100, 0), 100)
            : null;

    /* ================================================================
       MAIN PAGE
    ================================================================= */

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A]">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* =====================================================
                    TOP NAVIGATION
                ====================================================== */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <button
                        onClick={() => navigate("/history")}
                        className="group inline-flex w-fit items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-[#64748B] transition-colors hover:bg-white hover:text-[#0F172A]"
                    >
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform group-hover:-translate-x-0.5"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>

                        Back to History
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" />

                        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                            Verification Report
                        </span>
                    </div>
                </div>

                {/* =====================================================
                    REPORT HEADER
                ====================================================== */}

                <div
                    className="mb-6 overflow-hidden rounded-2xl border shadow-sm"
                    style={{
                        backgroundColor: verdictBg,
                        borderColor: verdictBorder,
                    }}
                >
                    <div className="p-6 sm:p-8">

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            {/* Verdict */}
                            <div className="flex items-start gap-4">

                                <div
                                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl font-bold shadow-sm"
                                    style={{
                                        color: verdictText,
                                    }}
                                >
                                    {verdictIcon}
                                </div>

                                <div>
                                    <p
                                        className="text-xs font-bold uppercase tracking-widest"
                                        style={{
                                            color: verdictText,
                                        }}
                                    >
                                        AI Verification Result
                                    </p>

                                    <h1
                                        className="mt-1 text-2xl font-bold sm:text-3xl"
                                        style={{
                                            color: "#0F172A",
                                        }}
                                    >
                                        {verdict}
                                    </h1>

                                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#475569]">
                                        {verdictDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Score */}
                            {scorePercentage !== null && (
                                <div className="flex items-center gap-5 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm">

                                    <div className="text-right">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                            Risk Score
                                        </p>

                                        <p
                                            className="mt-1 text-3xl font-bold"
                                            style={{
                                                color: verdictText,
                                            }}
                                        >
                                            {scorePercentage.toFixed(0)}%
                                        </p>
                                    </div>

                                    <div className="relative h-14 w-14">
                                        <svg
                                            className="h-14 w-14 -rotate-90"
                                            viewBox="0 0 36 36"
                                        >
                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                                stroke="#E2E8F0"
                                                strokeWidth="3"
                                            />

                                            <circle
                                                cx="18"
                                                cy="18"
                                                r="15"
                                                fill="none"
                                                stroke={verdictText}
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeDasharray="94.2"
                                                strokeDashoffset={
                                                    94.2 -
                                                    (94.2 * scorePercentage) /
                                                        100
                                                }
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    MAIN REPORT CARD
                ====================================================== */}

                <Card className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-0 shadow-sm">

                    {/* =================================================
                        REPORT TITLE BAR
                    ================================================== */}

                    <div className="border-b border-[#E2E8F0] px-5 py-5 sm:px-7">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-lg font-bold text-[#0F172A]">
                                    Verification Analysis
                                </h2>

                                <p className="mt-1 text-sm text-[#64748B]">
                                    Detailed analysis, evidence and recommendations
                                    for this job posting.
                                </p>
                            </div>

                            <div
                                className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold"
                                style={{
                                    color: verdictText,
                                    backgroundColor: verdictBg,
                                    borderColor: verdictBorder,
                                }}
                            >
                                <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{
                                        backgroundColor: verdictText,
                                    }}
                                />

                                {verdict}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        SCORE SECTION
                    ================================================== */}

                    <div className="border-b border-[#E2E8F0] p-5 sm:p-7">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                01 · Risk Assessment
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                                AI Risk Analysis
                            </h3>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Combined signals from the machine learning model
                                and AI investigation.
                            </p>
                        </div>

                        <ScoreSection
                            finalScore={detail?.final_score}
                            mlScore={detail?.ml_score}
                            agentScore={detail?.agent_score}
                        />
                    </div>

                    {/* =================================================
                        REASONS SECTION
                    ================================================== */}

                    <div className="border-b border-[#E2E8F0] p-5 sm:p-7">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                02 · Detection Signals
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                                Why was this flagged?
                            </h3>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Key signals identified during the verification process.
                            </p>
                        </div>

                        <ReasonsSection
                            reasons={detail?.reasons}
                        />
                    </div>

                    {/* =================================================
                        RECOMMENDATIONS SECTION
                    ================================================== */}

                    <div className="border-b border-[#E2E8F0] p-5 sm:p-7">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                03 · Recommended Action
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                                What should you do?
                            </h3>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Recommendations based on the detected risk indicators.
                            </p>
                        </div>

                        <RecommendationsSection
                            recommendations={detail?.recommendations}
                        />
                    </div>

                    {/* =================================================
                        EVIDENCE SECTION
                    ================================================== */}

                    <div className="border-b border-[#E2E8F0] p-5 sm:p-7">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                04 · Supporting Evidence
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                                Investigation Evidence
                            </h3>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Information gathered during the automated verification.
                            </p>
                        </div>

                        <EvidenceSection
                            evidence={detail?.evidence}
                        />
                    </div>

                    {/* =================================================
                        METADATA SECTION
                    ================================================== */}

                    <div className="p-5 sm:p-7">
                        <div className="mb-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                05 · Verification Details
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                                Report Information
                            </h3>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Reference information for this verification.
                            </p>
                        </div>

                        <MetadataSection
                            id={detail?._id}
                            timestamp={detail?.timestamp}
                        />
                    </div>
                </Card>

                {/* =====================================================
                    BOTTOM ACTIONS
                ====================================================== */}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/history")}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 py-3 font-semibold text-[#0F172A] transition-all hover:bg-[#F8F9FA]"
                    >
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>

                        Back to History
                    </Button>

                    <Link to="/verify">
                        <Button
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] hover:shadow-md sm:w-auto"
                        >
                            Verify Another Job

                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </Button>
                    </Link>
                </div>

                {/* =====================================================
                    DISCLAIMER
                ====================================================== */}

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-4">
                    <div className="mt-0.5 shrink-0 text-[#64748B]">
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 8v4" />
                            <path d="M12 16h.01" />
                        </svg>
                    </div>

                    <p className="text-xs leading-5 text-[#64748B]">
                        JobScout Agent provides automated risk analysis to help you
                        evaluate job opportunities. Results should be considered
                        alongside your own research and judgment.
                    </p>
                </div>
            </div>
        </div>
    );
}