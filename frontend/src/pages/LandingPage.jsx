/**
 * Landing Page Component.
 *
 * Public landing page showcasing JobScout Agent's AI-powered
 * fake job detection capabilities.
 *
 * Redesigned for a trust-first AI verification platform.
 */

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import { APP_NAME } from "../constants";

export default function LandingPage() {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            number: "01",
            title: "ML-Powered Detection",
            description:
                "Analyze job descriptions for suspicious language, patterns, keywords, and fraud indicators using machine learning.",
            icon: (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6v6H9z" />
                    <path d="M9 2v2" />
                    <path d="M15 2v2" />
                    <path d="M9 20v2" />
                    <path d="M15 20v2" />
                    <path d="M20 9h2" />
                    <path d="M20 14h2" />
                    <path d="M2 9h2" />
                    <path d="M2 14h2" />
                </svg>
            ),
        },
        {
            number: "02",
            title: "AI Investigation",
            description:
                "An autonomous AI agent investigates company websites, domains, career pages, and available evidence.",
            icon: (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="m4.93 4.93 2.83 2.83" />
                    <path d="m16.24 16.24 2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="m4.93 19.07 2.83-2.83" />
                    <path d="m16.24 7.76 2.83-2.83" />
                    <circle cx="12" cy="12" r="4" />
                </svg>
            ),
        },
        {
            number: "03",
            title: "Hybrid Risk Score",
            description:
                "Combine ML predictions and AI investigation results into one clear, explainable job risk assessment.",
            icon: (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 3v18h18" />
                    <path d="m7 16 4-5 3 3 5-7" />
                </svg>
            ),
        },
        {
            number: "04",
            title: "Evidence-Based Reports",
            description:
                "Understand why a job was flagged with evidence, risk factors, and actionable recommendations.",
            icon: (
                <svg
                    width="22"
                    height="22"
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
            ),
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-[#F8F9FA] text-[#0F172A]">

            {/* =========================================================
                HERO
            ========================================================== */}

            <section className="relative px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">

                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#DBEAFE] opacity-40 blur-3xl" />

                    <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-[#E0E7FF] opacity-30 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl">

                    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">

                        {/* =================================================
                            HERO CONTENT
                        ================================================== */}

                        <div className="max-w-2xl">

                            {/* Badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white px-3.5 py-2 shadow-sm">

                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ECFDF5] text-[#10B981]">
                                    <svg
                                        width="13"
                                        height="13"
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

                                <span className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                                    Powered by ML + Agentic AI
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl xl:text-7xl">

                                Verify Before
                                <br />

                                <span className="text-[#2563EB]">
                                    You Apply.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
                                {APP_NAME} uses machine learning and autonomous
                                AI investigation to help you identify fake,
                                suspicious, and potentially fraudulent job
                                postings before they cost you your time or
                                money.
                            </p>

                            {/* CTAs */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                {isAuthenticated ? (
                                    <Link to="/verify">
                                        <Button
                                            size="lg"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-lg sm:w-auto"
                                        >
                                            Scan a Job
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
                                                <path d="M5 12h14" />
                                                <path d="m13 6 6 6-6 6" />
                                            </svg>
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <Button
                                            size="lg"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-lg sm:w-auto"
                                        >
                                            Get Started
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
                                                <path d="M5 12h14" />
                                                <path d="m13 6 6 6-6 6" />
                                            </svg>
                                        </Button>
                                    </Link>
                                )}

                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3.5 text-sm font-semibold text-[#334155] shadow-sm transition-all hover:border-[#94A3B8] hover:bg-[#E8F4F8]"
                                >
                                    See How It Works
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
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </a>
                            </div>

                            {/* Trust indicators */}
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-[#64748B]">

                                <div className="flex items-center gap-2">
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
                                    Explainable results
                                </div>

                                <div className="flex items-center gap-2">
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
                                    AI-powered analysis
                                </div>

                                <div className="flex items-center gap-2">
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
                                    Evidence-based
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            HERO VISUAL
                        ================================================== */}

                        <div className="relative mx-auto w-full max-w-xl lg:mx-0">

                            {/* Background grid */}
                            <div className="absolute inset-4 rounded-3xl bg-[#DBEAFE] opacity-50 blur-2xl" />

                            <div className="relative rounded-3xl border border-[#DCE5F2] bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-6">

                                {/* Browser-like top */}
                                <div className="mb-5 flex items-center justify-between border-b border-[#E2E8F0] pb-4">

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" />
                                    </div>

                                    <div className="rounded-lg bg-[#F8F9FA] px-3 py-1.5 text-[10px] font-semibold text-[#94A3B8]">
                                        JobScout Agent / verification
                                    </div>
                                </div>

                                {/* Job header */}
                                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-4">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-bold text-white">
                                            AC
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-[#0F172A]">
                                                Software Developer Intern
                                            </p>

                                            <p className="mt-1 text-xs text-[#64748B]">
                                                Abc Technologies · Remote
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-medium text-[#64748B]">
                                            Full-time
                                        </span>

                                        <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-medium text-[#64748B]">
                                            Engineering
                                        </span>
                                    </div>
                                </div>

                                {/* Analysis */}
                                <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4">

                                    <div className="mb-4 flex items-center justify-between">

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                                                Verification
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-[#0F172A]">
                                                AI Risk Assessment
                                            </p>
                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
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
                                                <path d="M12 2v4" />
                                                <path d="M12 18v4" />
                                                <path d="m4.93 4.93 2.83 2.83" />
                                                <path d="m16.24 16.24 2.83 2.83" />
                                                <path d="M2 12h4" />
                                                <path d="M18 12h4" />
                                                <circle cx="12" cy="12" r="4" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Analysis steps */}
                                    <div className="space-y-3">

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981]">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m5 12 4 4L19 6" />
                                                </svg>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-[#334155]">
                                                    Job posting analyzed
                                                </p>
                                            </div>

                                            <span className="text-[10px] font-medium text-[#10B981]">
                                                Complete
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981]">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m5 12 4 4L19 6" />
                                                </svg>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-[#334155]">
                                                    Company verified
                                                </p>
                                            </div>

                                            <span className="text-[10px] font-medium text-[#10B981]">
                                                Complete
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981]">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m5 12 4 4L19 6" />
                                                </svg>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-[#334155]">
                                                    Domain analyzed
                                                </p>
                                            </div>

                                            <span className="text-[10px] font-medium text-[#10B981]">
                                                Complete
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFFBEB] text-[#F59E0B]">
                                                <span className="text-xs font-bold">
                                                    !
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-[#334155]">
                                                    Risk indicators found
                                                </p>
                                            </div>

                                            <span className="text-[10px] font-medium text-[#F59E0B]">
                                                Review
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Score */}
                                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#0F172A] p-4 text-white">

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                            Trust Score
                                        </p>

                                        <p className="mt-1 text-2xl font-bold">
                                            86
                                            <span className="text-sm font-medium text-[#64748B]">
                                                /100
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-[#047857]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                                        VERIFIED
                                    </div>
                                </div>
                            </div>

                            {/* Floating safe badge */}
                            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-[#D1FAE5] bg-white p-3 shadow-lg sm:block">
                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
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
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                                            Status
                                        </p>

                                        <p className="text-xs font-bold text-[#047857]">
                                            Verified
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                TRUST / PROBLEM SECTION
            ========================================================== */}

            <section className="border-y border-[#E2E8F0] bg-white px-4 py-16 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-7xl">

                    <div className="grid items-center gap-10 lg:grid-cols-2">

                        <div>
                            <div className="mb-4 inline-flex rounded-full bg-[#FEF2F2] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B91C1C]">
                                Before you apply
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                                Not every job posting
                                <span className="text-[#EF4444]">
                                    {" "}deserves your trust.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B]">
                                Fake recruiters, misleading job descriptions,
                                suspicious domains, and unrealistic offers can
                                make it difficult to know which opportunities
                                are genuine.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-5">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#EF4444]">
                                    <svg
                                        width="19"
                                        height="19"
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

                                <p className="text-sm font-bold text-[#991B1B]">
                                    Suspicious recruiters
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#B91C1C]">
                                    Identify warning signs before sharing personal information.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-5">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#F59E0B]">
                                    <svg
                                        width="19"
                                        height="19"
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

                                <p className="text-sm font-bold text-[#92400E]">
                                    Hidden warning signs
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#B45309]">
                                    Detect patterns that may not be obvious at first glance.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2563EB]">
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 8v8" />
                                        <path d="M8 12h8" />
                                    </svg>
                                </div>

                                <p className="text-sm font-bold text-[#1D4ED8]">
                                    Multiple signals
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#1E40AF]">
                                    Combine different sources of evidence into one assessment.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#D1FAE5] bg-[#ECFDF5] p-5">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#10B981]">
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>
                                </div>

                                <p className="text-sm font-bold text-[#047857]">
                                    Safer decisions
                                </p>

                                <p className="mt-1 text-xs leading-5 text-[#047857]">
                                    Get evidence that helps you decide what to do next.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                HOW IT WORKS
            ========================================================== */}

            <section
                id="how-it-works"
                className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="mx-auto mb-14 max-w-2xl text-center">

                        <div className="mb-4 inline-flex rounded-full bg-[#EFF6FF] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                            How it works
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                            One job. Multiple layers of verification.
                        </h2>

                        <p className="mt-4 text-base leading-7 text-[#64748B]">
                            JobScout Agent combines machine learning and autonomous
                            investigation to give you a clearer picture of
                            the opportunity you're considering.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group relative rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-lg"
                            >

                                <div className="mb-6 flex items-center justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white">
                                        {feature.icon}
                                    </div>

                                    <span className="text-xs font-bold text-[#CBD5E1]">
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-[#0F172A]">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* =========================================================
                HYBRID INTELLIGENCE
            ========================================================== */}

            <section className="bg-[#0F172A] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">

                <div className="mx-auto max-w-7xl">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                                Hybrid Intelligence
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Two perspectives.
                                <br />
                                <span className="text-[#60A5FA]">
                                    One clearer answer.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-7 text-[#94A3B8]">
                                JobScout Agent doesn't rely on a single signal.
                                Traditional machine learning analyzes the job
                                posting while an autonomous AI agent investigates
                                external evidence.
                            </p>

                            <div className="mt-8 space-y-4">

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/20 text-[#60A5FA]">
                                        <svg
                                            width="19"
                                            height="19"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <path d="M8 8h8" />
                                            <path d="M8 12h8" />
                                            <path d="M8 16h5" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Machine Learning
                                        </h3>

                                        <p className="mt-1 text-sm leading-5 text-[#64748B]">
                                            Detects suspicious language and patterns
                                            within the job posting.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/20 text-[#A78BFA]">
                                        <svg
                                            width="19"
                                            height="19"
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
                                            <path d="m4.93 4.93 1.41 1.41" />
                                            <path d="m17.66 17.66 1.41 1.41" />
                                            <path d="M2 12h2" />
                                            <path d="M20 12h2" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Agentic Investigation
                                        </h3>

                                        <p className="mt-1 text-sm leading-5 text-[#64748B]">
                                            Investigates company and domain evidence
                                            beyond the original posting.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Score visualization */}
                        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">

                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                                        Combined Analysis
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-white">
                                        Example verification
                                    </p>
                                </div>

                                <div className="rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-[#047857]">
                                    LOW RISK
                                </div>
                            </div>

                            {/* ML */}
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-white">
                                        ML Analysis
                                    </span>

                                    <span className="text-sm font-bold text-[#60A5FA]">
                                        18%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[18%] rounded-full bg-[#2563EB]" />
                                </div>
                            </div>

                            {/* Agent */}
                            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-white">
                                        AI Investigation
                                    </span>

                                    <span className="text-sm font-bold text-[#A78BFA]">
                                        12%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[12%] rounded-full bg-[#8B5CF6]" />
                                </div>
                            </div>

                            {/* Final */}
                            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-5">

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                                        Final Risk Score
                                    </p>

                                    <p className="mt-1 text-3xl font-bold text-[#0F172A]">
                                        15%
                                    </p>
                                </div>

                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#D1FAE5] bg-[#ECFDF5] text-[#10B981]">
                                    <svg
                                        width="23"
                                        height="23"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                STATS
            ========================================================== */}

            <section className="border-b border-[#E2E8F0] bg-white px-4 py-14 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-5xl">

                    <div className="grid grid-cols-1 divide-y divide-[#E2E8F0] sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                        <div className="px-6 py-4 text-center">
                            <p className="text-3xl font-bold text-[#0F172A]">
                                2
                            </p>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Independent pipelines
                            </p>
                        </div>

                        <div className="px-6 py-4 text-center">
                            <p className="text-3xl font-bold text-[#0F172A]">
                                Real-time
                            </p>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Analysis & results
                            </p>
                        </div>

                        <div className="px-6 py-4 text-center">
                            <p className="text-3xl font-bold text-[#0F172A]">
                                Explainable
                            </p>

                            <p className="mt-1 text-sm text-[#64748B]">
                                Evidence-based reports
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================================
                CTA
            ========================================================== */}

            <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">

                <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#0F172A] px-6 py-14 text-center shadow-xl sm:px-10">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-lg">
                        <svg
                            width="27"
                            height="27"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Before you apply,
                        <br />
                        <span className="text-[#60A5FA]">
                            verify the opportunity.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#94A3B8] sm:text-base">
                        Use JobScout Agent to analyze a job posting and understand
                        the signals behind its risk assessment.
                    </p>

                    <div className="mt-8">
                        {isAuthenticated ? (
                            <Link to="/verify">
                                <Button
                                    size="lg"
                                    className="rounded-xl bg-blue px-7 py-3.5 font-bold text-[#0F172A] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
                                >
                                    Verify a Job →
                                </Button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    className="rounded-xl bg-blue px-7 py-3.5 font-bold text-[#0F172A] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#00008B]"
                                >
                                    Get Started →
                                </Button>
                            </Link>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}