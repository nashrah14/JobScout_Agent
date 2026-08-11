/**
 * Verify Page Component.
 *
 * Provides the main job posting verification interface.
 * Handles form submission, loading state, and result display.
 *
 * Redesigned for JobScout Agent's trust-first AI job verification platform.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useVerify } from "../hooks/useVerify";

import VerificationForm from "../components/verification/VerificationForm";
import LoadingProgress from "../components/verification/LoadingProgress";
import ResultCard from "../components/verification/ResultCard";

export default function VerifyPage() {
    const { isAuthenticated, loading: authLoading } = useAuth();

    const {
        verifying,
        result,
        error,
        submitVerification,
        clearResult,
    } = useVerify();

    const navigate = useNavigate();

    /* ================================================================
       AUTHENTICATION
    ================================================================= */

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [authLoading, isAuthenticated, navigate]);

    /* ================================================================
       LOADING AUTH
    ================================================================= */

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white px-10 py-10 shadow-sm">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF]">
                        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
                    </div>

                    <p className="text-sm font-medium text-[#64748B]">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    /* ================================================================
       HANDLERS
    ================================================================= */

    const handleSubmit = async (formData) => {
        try {
            clearResult();
            await submitVerification(formData);
        } catch {
            // Error is handled by the verification context.
        }
    };

    const handleTryAgain = () => {
        clearResult();
    };

    /* ================================================================
       MAIN PAGE
    ================================================================= */

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A]">

            {/* =========================================================
                BACKGROUND
            ========================================================== */}

            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

                <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#DBEAFE] opacity-40 blur-3xl" />

                <div className="absolute right-[-150px] top-[350px] h-[350px] w-[350px] rounded-full bg-[#E0E7FF] opacity-25 blur-3xl" />

            </div>

            <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="mb-8">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            {/* Label */}
                            <div className="mb-3 flex items-center gap-2">

                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2v4" />
                                        <path d="M12 18v4" />
                                        <path d="M4.93 4.93l2.83 2.83" />
                                        <path d="M16.24 16.24l2.83 2.83" />
                                        <path d="M2 12h4" />
                                        <path d="M18 12h4" />
                                        <circle cx="12" cy="12" r="4" />
                                    </svg>
                                </span>

                                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                    Job Safety Check
                                </span>

                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                                Verify a Job Posting
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                                Analyze a job opportunity using machine
                                learning and autonomous AI investigation
                                before you apply.
                            </p>

                        </div>

                        {/* Security badge */}
                        <div className="hidden items-center gap-2 rounded-full border border-[#D1FAE5] bg-white px-3.5 py-2 shadow-sm sm:flex">

                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981]">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m5 12 4 4L19 6" />
                                </svg>
                            </span>

                            <span className="text-xs font-semibold text-[#047857]">
                                Secure Analysis
                            </span>

                        </div>

                    </div>
                </div>

                {/* =====================================================
                    PIPELINE INFORMATION
                ====================================================== */}

                {!result && !verifying && (
                    <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">

                        {/* Step 1 */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">

                            <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                                    <span className="text-xs font-bold">
                                        01
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#334155]">
                                        Analyze
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#64748B]">
                                        ML checks the job posting for suspicious patterns.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">

                            <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-[#7C3AED]">
                                    <span className="text-xs font-bold">
                                        02
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#334155]">
                                        Investigate
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#64748B]">
                                        AI investigates company and domain evidence.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">

                            <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
                                    <span className="text-xs font-bold">
                                        03
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#334155]">
                                        Assess
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#64748B]">
                                        Get one explainable risk assessment.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                )}

                {/* =====================================================
                    ERROR
                ====================================================== */}

                {error && !result && (
                    <div className="mb-6 overflow-hidden rounded-2xl border border-[#FECACA] bg-white shadow-sm">

                        <div className="flex items-start gap-4 bg-[#FEF2F2] px-5 py-4">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] text-[#EF4444]">

                                <svg
                                    width="20"
                                    height="20"
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

                            <div className="min-w-0">

                                <p className="text-sm font-bold text-[#991B1B]">
                                    Verification could not be completed
                                </p>

                                <p className="mt-1 text-sm leading-6 text-[#B91C1C]">
                                    {error}
                                </p>

                            </div>

                        </div>
                    </div>
                )}

                {/* =====================================================
                    VERIFICATION WORKSPACE
                ====================================================== */}

                {result ? (

                    /* =================================================
                       RESULT
                    ================================================== */

                    <div className="space-y-6">

                        <div className="rounded-2xl border border-[#D1FAE5] bg-[#ECFDF5] px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#10B981] shadow-sm">

                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>

                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#047857]">
                                        Verification complete
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#047857]">
                                        Your job posting has been analyzed.
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Actual result component */}
                        <ResultCard result={result} />

                        {/* Try again */}
                        <div className="flex flex-col items-center gap-3 pt-2">

                            <button
                                onClick={handleTryAgain}
                                className="inline-flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#334155] shadow-sm transition-all hover:border-[#94A3B8] hover:bg-[#F8FAFC] hover:shadow-md"
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
                                    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                                    <path d="M21 3v5h-5" />
                                    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                                    <path d="M3 21v-5h5" />
                                </svg>

                                Verify Another Job
                            </button>

                            <p className="text-xs text-[#94A3B8]">
                                Analyze another opportunity whenever you're ready.
                            </p>

                        </div>

                    </div>

                ) : verifying ? (

                    /* =================================================
                       LOADING
                    ================================================== */

                    <div className="overflow-hidden rounded-2xl border border-[#DCE5F2] bg-white shadow-sm">

                        <div className="border-b border-[#E2E8F0] bg-[#FAFBFC] px-5 py-5 sm:px-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">

                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />

                                </div>

                                <div>

                                    <p className="text-sm font-bold text-[#0F172A]">
                                        Analyzing job posting
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#64748B]">
                                        Our verification pipelines are working...
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="px-5 py-6 sm:px-6">
                            <LoadingProgress />
                        </div>

                    </div>

                ) : (

                    /* =================================================
                       VERIFICATION FORM
                    ================================================== */

                    <div className="overflow-hidden rounded-2xl border border-[#DCE5F2] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">

                        {/* Form header */}
                        <div className="border-b border-[#E2E8F0] bg-[#FAFBFC] px-5 py-5 sm:px-7">

                            <div className="flex items-start gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-white">

                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <path d="M14 2v6h6" />
                                        <path d="M8 13h8" />
                                        <path d="M8 17h5" />
                                    </svg>

                                </div>

                                <div>

                                    <h2 className="text-base font-bold text-[#0F172A]">
                                        Submit a Job for Verification
                                    </h2>

                                    <p className="mt-1 text-xs leading-5 text-[#64748B] sm:text-sm">
                                        Enter the job posting details below.
                                        JobScout Agent will analyze the information
                                        and generate a risk assessment.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Existing form */}
                        <div className="px-5 py-6 sm:px-7 sm:py-7">

                            <VerificationForm
                                onSubmit={handleSubmit}
                                loading={verifying}
                            />

                        </div>

                        {/* Security note */}
                        <div className="border-t border-[#E2E8F0] bg-[#FAFBFC] px-5 py-4 sm:px-7">

                            <div className="flex items-start gap-3">

                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981]">

                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6-8 10-8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>

                                </div>

                                <p className="text-[11px] leading-5 text-[#64748B]">
                                    Your verification is processed securely.
                                    Results are generated from available
                                    signals and should be used as decision
                                    support alongside your own research.
                                </p>

                            </div>

                        </div>

                    </div>
                )}

                {/* =====================================================
                    BOTTOM INFORMATION
                ====================================================== */}

                {!result && !verifying && (
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

                        <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 2v4" />
                                    <path d="M12 18v4" />
                                    <path d="M4.93 4.93l2.83 2.83" />
                                    <path d="M16.24 16.24l2.83 2.83" />
                                    <path d="M2 12h4" />
                                    <path d="M18 12h4" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-[#334155]">
                                    ML analysis
                                </p>

                                <p className="text-[10px] text-[#94A3B8]">
                                    Pattern detection
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5F3FF] text-[#7C3AED]">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2" />
                                    <path d="M12 20v2" />
                                    <path d="M2 12h2" />
                                    <path d="M20 12h2" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-[#334155]">
                                    AI investigation
                                </p>

                                <p className="text-[10px] text-[#94A3B8]">
                                    External evidence
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981]">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-[#334155]">
                                    Risk assessment
                                </p>

                                <p className="text-[10px] text-[#94A3B8]">
                                    Explainable result
                                </p>
                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}