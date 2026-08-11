/**
 * Dashboard Page Component
 *
 * Displays user's verification statistics and summary overview.
 * Redesigned for JobScout Agent's trust-first AI fake-job detection platform.
 */

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "../hooks/useHistory";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import VerificationHistoryItem from "../components/dashboard/VerificationHistoryItem";

export default function DashboardPage() {
    const { isAuthenticated, loading: authLoading, user } = useAuth();

    const {
        items,
        total,
        loading: historyLoading,
        loadHistory,
    } = useHistory();

    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, authLoading, navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            loadHistory(1, 5);
        }
    }, [isAuthenticated, loadHistory]);

    if (authLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F9FA]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
                    <p className="text-sm font-medium text-[#64748B]">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    const handleViewDetail = (verificationId) => {
        navigate(`/history/${verificationId}`);
    };

    const recentItems = items.slice(0, 5);

    const averageScore = items.length
        ? items.reduce(
              (acc, item) => acc + (item.overall_score || 0),
              0
          ) / items.length
        : null;

    const fraudulentCount = items.filter(
        (item) => item.verdict?.toLowerCase() === "fraudulent"
    ).length;

    const suspiciousCount = items.filter(
        (item) => item.verdict?.toLowerCase() === "suspicious"
    ).length;

    const safeCount = items.filter(
        (item) =>
            item.verdict?.toLowerCase() === "safe" ||
            item.verdict?.toLowerCase() === "legitimate"
    ).length;

    const getFirstName = () => {
        if (!user?.name) return "there";
        return user.name.split(" ")[0];
    };

    const getRiskLabel = () => {
        if (averageScore === null) return "No data yet";

        const percentage = averageScore * 100;

        if (percentage >= 70) return "High Risk";
        if (percentage >= 40) return "Moderate Risk";
        return "Low Risk";
    };

    const getRiskColor = () => {
        if (averageScore === null) return "#64748B";

        const percentage = averageScore * 100;

        if (percentage >= 70) return "#EF4444";
        if (percentage >= 40) return "#F59E0B";
        return "#10B981";
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* =====================================================
                    HEADER
                ====================================================== */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                                Verification Center
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                            Welcome back, {getFirstName()}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
                            Monitor your job verification activity and identify
                            potentially fraudulent opportunities before you apply.
                        </p>
                    </div>

                    <Link to="/verify">
                        <Button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] hover:shadow-md sm:w-auto">
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
                            Verify a Job
                        </Button>
                    </Link>
                </div>

                {/* =====================================================
                    TRUST BANNER
                ====================================================== */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-[#DBEAFE] bg-gradient-to-r from-[#EFF6FF] via-white to-[#F8FAFC]">
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-sm">
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
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>

                            <div>
                                <h2 className="font-semibold text-[#0F172A]">
                                    Stay protected from fake job postings
                                </h2>

                                <p className="mt-1 text-sm leading-5 text-[#64748B]">
                                    JobScout Agent combines automated analysis and AI-powered
                                    investigation to help you make safer career decisions.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/verify"
                            className="shrink-0 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                        >
                            Scan a job →
                        </Link>
                    </div>
                </div>

                {/* =====================================================
                    STATISTICS
                ====================================================== */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Total */}
                    <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#64748B]">
                                    Total Scanned
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-[#0F172A]">
                                    {total}
                                </p>

                                <p className="mt-1 text-xs text-[#94A3B8]">
                                    Job verifications
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
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
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Safe */}
                    <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#64748B]">
                                    Safe
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-[#10B981]">
                                    {safeCount}
                                </p>

                                <p className="mt-1 text-xs text-[#94A3B8]">
                                    Verified opportunities
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
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
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Suspicious */}
                    <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#64748B]">
                                    Suspicious
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-[#F59E0B]">
                                    {suspiciousCount}
                                </p>

                                <p className="mt-1 text-xs text-[#94A3B8]">
                                    Need further review
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
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
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Fraudulent */}
                    <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#64748B]">
                                    Fraudulent
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-[#EF4444]">
                                    {fraudulentCount}
                                </p>

                                <p className="mt-1 text-xs text-[#94A3B8]">
                                    High-risk postings
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#EF4444]">
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
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* =================================================
                        RECENT VERIFICATIONS
                    ================================================== */}
                    <div className="xl:col-span-2">
                        <Card className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-0 shadow-sm">

                            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-5 sm:px-6">
                                <div>
                                    <h2 className="text-lg font-bold text-[#0F172A]">
                                        Recent Verifications
                                    </h2>

                                    <p className="mt-1 text-sm text-[#64748B]">
                                        Your latest job safety checks
                                    </p>
                                </div>

                                <Link
                                    to="/history"
                                    className="rounded-lg px-3 py-2 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="p-5 sm:p-6">

                                {historyLoading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="animate-pulse rounded-xl border border-[#E2E8F0] bg-[#F8F9FA] p-5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg bg-[#E2E8F0]" />

                                                    <div className="flex-1">
                                                        <div className="mb-2 h-3 w-2/5 rounded bg-[#E2E8F0]" />
                                                        <div className="h-3 w-3/5 rounded bg-[#E2E8F0]" />
                                                    </div>

                                                    <div className="h-7 w-20 rounded-full bg-[#E2E8F0]" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : recentItems.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentItems.map((item) => (
                                            <VerificationHistoryItem
                                                key={item.verification_id}
                                                item={item}
                                                onClick={handleViewDetail}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8F9FA] px-6 py-12 text-center">

                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
                                            <svg
                                                width="26"
                                                height="26"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <path d="M9 13h6" />
                                                <path d="M9 17h4" />
                                            </svg>
                                        </div>

                                        <h3 className="font-semibold text-[#0F172A]">
                                            No verifications yet
                                        </h3>

                                        <p className="mt-1 max-w-sm text-sm text-[#64748B]">
                                            Scan your first job posting to find out
                                            whether it's safe, suspicious, or potentially
                                            fraudulent.
                                        </p>

                                        <Link
                                            to="/verify"
                                            className="mt-5"
                                        >
                                            <Button className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-semibold text-white hover:bg-[#1D4ED8]">
                                                Verify Your First Job
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* =================================================
                        RIGHT COLUMN
                    ================================================== */}
                    <div className="space-y-6">

                        {/* Quick Actions */}
                        <Card className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                            <div className="mb-5">
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
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
                                        <path d="M12 5v14" />
                                        <path d="M5 12h14" />
                                    </svg>
                                </div>

                                <h2 className="mt-4 text-lg font-bold text-[#0F172A]">
                                    Quick Actions
                                </h2>

                                <p className="mt-1 text-sm text-[#64748B]">
                                    Start a new verification or review your activity.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Link
                                    to="/verify"
                                    className="block"
                                >
                                    <Button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] hover:shadow-md">
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
                                        Verify New Job
                                    </Button>
                                </Link>

                                <Link
                                    to="/history"
                                    className="block"
                                >
                                    <Button
                                        variant="secondary"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-3 font-semibold text-[#0F172A] transition-all hover:bg-[#F8F9FA]"
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
                                            <circle cx="12" cy="12" r="9" />
                                            <polyline points="12 7 12 12 15 14" />
                                        </svg>
                                        View Verification History
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        {/* Average Risk Score */}
                        {averageScore !== null && (
                            <Card className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">

                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-[#64748B]">
                                            Average Risk Score
                                        </p>

                                        <p
                                            className="mt-3 text-4xl font-bold tracking-tight"
                                            style={{
                                                color: getRiskColor(),
                                            }}
                                        >
                                            {(averageScore * 100).toFixed(0)}%
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F9FA]">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke={getRiskColor()}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 12h4l3-8 4 16 3-8h4" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mt-5">
                                    <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: `${Math.min(
                                                    averageScore * 100,
                                                    100
                                                )}%`,
                                                backgroundColor: getRiskColor(),
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span
                                        className="text-sm font-semibold"
                                        style={{
                                            color: getRiskColor(),
                                        }}
                                    >
                                        {getRiskLabel()}
                                    </span>

                                    <span className="text-xs text-[#94A3B8]">
                                        {total} verification
                                        {total !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </Card>
                        )}

                        {/* Safety Tip */}
                        <div className="rounded-2xl border border-[#E2E8F0] bg-[#0F172A] p-5 text-white shadow-sm">

                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#93C5FD]">
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
                                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                            </div>

                            <h3 className="font-semibold">
                                Job safety tip
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">
                                Never pay an employer to apply for a job or receive
                                an offer. Legitimate employers typically don't ask
                                candidates for upfront fees.
                            </p>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    FOOTER NOTE
                ====================================================== */}
                <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#E2E8F0] pt-5 text-xs text-[#94A3B8] sm:flex-row">
                    <p>
                        JobScout Agent helps you make safer decisions about online job
                        opportunities.
                    </p>

                    <p>
                        AI-powered verification
                    </p>
                </div>
            </div>
        </div>
    );
}