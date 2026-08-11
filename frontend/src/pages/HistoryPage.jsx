/**
 * History Page Component.
 *
 * Displays paginated list of all verification history
 * for the authenticated user.
 *
 * Redesigned for JobScout Agent's trust-first AI fake-job detection platform.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "../hooks/useHistory";
import VerificationHistoryItem from "../components/dashboard/VerificationHistoryItem";
import Card from "../components/common/Card";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";

export default function HistoryPage() {
    const { isAuthenticated, loading: authLoading } = useAuth();

    const {
        items,
        total,
        loading,
        loadHistory,
    } = useHistory();

    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const limit = 20;
    const totalPages = Math.ceil(total / limit);

    /* ================================================================
       AUTHENTICATION
    ================================================================= */

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, authLoading, navigate]);

    /* ================================================================
       LOAD HISTORY
    ================================================================= */

    useEffect(() => {
        if (isAuthenticated) {
            loadHistory(page, limit);
        }
    }, [isAuthenticated, page, loadHistory]);

    /* ================================================================
       LOADING AUTH
    ================================================================= */

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white px-10 py-10 shadow-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />

                    <p className="text-sm font-medium text-[#64748B]">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    /* ================================================================
       HANDLERS
    ================================================================= */

    const handleViewDetail = (verificationId) => {
        navigate(`/history/${verificationId}`);
    };

    const handlePrevious = () => {
        setPage((currentPage) => Math.max(1, currentPage - 1));
    };

    const handleNext = () => {
        setPage((currentPage) =>
            Math.min(totalPages, currentPage + 1)
        );
    };

    /* ================================================================
       MAIN PAGE
    ================================================================= */

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A]">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* =====================================================
                    PAGE HEADER
                ====================================================== */}

                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#2563EB]" />

                            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                                Investigations
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                            Verification History
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                            Review your previous job posting analyses,
                            risk assessments, and verification results.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/verify")}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] hover:shadow-md sm:w-auto"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>

                        Verify New Job
                    </Button>
                </div>

                {/* =====================================================
                    SUMMARY STRIP
                ====================================================== */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Total */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
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
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <path d="M8 13h8" />
                                    <path d="M8 17h5" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                                    Total Reports
                                </p>

                                <p className="mt-0.5 text-2xl font-bold text-[#0F172A]">
                                    {total}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Current page */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F9FA] text-[#475569]">
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
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="16"
                                        rx="2"
                                    />
                                    <path d="M7 8h10" />
                                    <path d="M7 12h6" />
                                    <path d="M7 16h4" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                                    Showing
                                </p>

                                <p className="mt-0.5 text-2xl font-bold text-[#0F172A]">
                                    {items.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Page */}
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
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
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 8v4l2.5 2" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                                    Current Page
                                </p>

                                <p className="mt-0.5 text-2xl font-bold text-[#0F172A]">
                                    {page}
                                    <span className="ml-1 text-base font-medium text-[#94A3B8]">
                                        / {totalPages || 1}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    HISTORY CARD
                ====================================================== */}

                <Card className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-0 shadow-sm">

                    {/* Card header */}
                    <div className="border-b border-[#E2E8F0] px-5 py-5 sm:px-6">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h2 className="text-lg font-bold text-[#0F172A]">
                                    Verification Reports
                                </h2>

                                <p className="mt-1 text-sm text-[#64748B]">
                                    Select a report to view the complete
                                    verification analysis.
                                </p>
                            </div>

                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D1FAE5] bg-[#ECFDF5] px-3 py-1.5 text-xs font-semibold text-[#047857]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />

                                Secure History
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        LOADING
                    ================================================== */}

                    {loading ? (
                        <div className="px-5 py-10 sm:px-6">
                            <div className="space-y-3">

                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div
                                        key={item}
                                        className="animate-pulse rounded-xl border border-[#E2E8F0] bg-[#F8F9FA] p-5"
                                    >
                                        <div className="flex items-center gap-4">

                                            <div className="h-11 w-11 rounded-xl bg-[#E2E8F0]" />

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 h-3 w-2/5 rounded-full bg-[#E2E8F0]" />
                                                <div className="h-3 w-3/5 rounded-full bg-[#E2E8F0]" />
                                            </div>

                                            <div className="hidden h-7 w-20 rounded-full bg-[#E2E8F0] sm:block" />
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ) : items.length === 0 ? (

                        /* =================================================
                           EMPTY STATE
                        ================================================== */

                        <div className="px-5 py-14 sm:px-6">

                            <div className="mx-auto flex max-w-md flex-col items-center text-center">

                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
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
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <path d="M9 13h6" />
                                        <path d="M9 17h4" />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-bold text-[#0F172A]">
                                    No verification reports yet
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                                    Start by scanning a job posting. JobScout Agent
                                    will analyze the opportunity and generate
                                    a detailed risk assessment.
                                </p>

                                <Button
                                    onClick={() => navigate("/verify")}
                                    className="mt-6 flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] hover:shadow-md"
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
                                        <path d="M12 5v14" />
                                        <path d="M5 12h14" />
                                    </svg>

                                    Verify a Job
                                </Button>
                            </div>
                        </div>
                    ) : (

                        /* =================================================
                           HISTORY LIST
                        ================================================== */

                        <div className="px-5 py-5 sm:px-6">

                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                                    Recent activity
                                </p>

                                <p className="text-xs text-[#94A3B8]">
                                    {items.length} report
                                    {items.length !== 1 ? "s" : ""}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {items.map((item) => (
                                    <VerificationHistoryItem
                                        key={item.verification_id}
                                        item={item}
                                        onClick={handleViewDetail}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* =================================================
                        PAGINATION
                    ================================================== */}

                    {!loading && items.length > 0 && (
                        <div className="border-t border-[#E2E8F0] bg-[#FAFBFC] px-5 py-4 sm:px-6">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                {/* Page information */}
                                <div>
                                    <p className="text-sm font-medium text-[#475569]">
                                        Page {page} of {totalPages || 1}
                                    </p>

                                    <p className="mt-0.5 text-xs text-[#94A3B8]">
                                        {total} total verification
                                        {total !== 1 ? "s" : ""}
                                    </p>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={handlePrevious}
                                        disabled={page <= 1}
                                        className="inline-flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] shadow-sm transition-all hover:bg-[#F8F9FA] hover:text-[#0F172A] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>

                                        Previous
                                    </button>

                                    <div className="hidden h-9 min-w-9 items-center justify-center rounded-xl bg-[#0F172A] px-3 text-sm font-bold text-white sm:flex">
                                        {page}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={
                                            page >= totalPages ||
                                            totalPages === 0
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#475569] shadow-sm transition-all hover:bg-[#F8F9FA] hover:text-[#0F172A] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next

                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* =====================================================
                    SAFETY NOTE
                ====================================================== */}

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-4 shadow-sm">

                    <div className="mt-0.5 shrink-0 text-[#2563EB]">
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
                        Verification results are automated assessments based
                        on available signals. Always perform your own research
                        before sharing sensitive information or accepting a job
                        offer.
                    </p>
                </div>

                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#E2E8F0] pt-5 text-xs text-[#94A3B8] sm:flex-row">
                    <p>
                        JobScout Agent · AI-powered job verification
                    </p>

                    <p>
                        Your verification history is securely stored.
                    </p>
                </div>
            </div>
        </div>
    );
}