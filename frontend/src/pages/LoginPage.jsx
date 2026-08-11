/**
 * Login Page Component.
 *
 * Provides Google OAuth authentication interface.
 *
 * Redesigned for JobScout Agent's trust-first AI verification platform.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { APP_NAME } from "../constants";

export default function LoginPage() {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, loading, navigate]);

    /* ================================================================
       LOADING STATE
    ================================================================= */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F172A] shadow-sm">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#2563EB]" />
                        Checking your session...
                    </div>
                </div>
            </div>
        );
    }

    /* ================================================================
       LOGIN PAGE
    ================================================================= */

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F8F9FA] text-[#0F172A]">

            {/* =========================================================
                BACKGROUND DECORATION
            ========================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                {/* Main blue glow */}
                <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#DBEAFE] opacity-50 blur-3xl" />

                {/* Secondary glow */}
                <div className="absolute bottom-[-150px] left-[-100px] h-[400px] w-[400px] rounded-full bg-[#E0E7FF] opacity-30 blur-3xl" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage:
                            "linear-gradient(to bottom, black, transparent 70%)",
                    }}
                />
            </div>


            {/* =========================================================
                MAIN
            ========================================================== */}

            <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-4 pb-12 pt-6 sm:px-6 lg:px-8">

                <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

                    {/* =================================================
                        LEFT — PRODUCT MESSAGE
                    ================================================== */}

                    <div className="hidden lg:block">

                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-white px-3 py-1.5 shadow-sm">

                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
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

                            <span className="text-xs font-bold uppercase tracking-wider text-[#334155]">
                                Your job safety assistant
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#0F172A] xl:text-5xl">
                            Know before
                            <br />
                            <span className="text-[#2563EB]">
                                you apply.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-lg text-base leading-7 text-[#64748B]">
                            {APP_NAME} combines machine learning and AI-powered
                            investigation to help you identify suspicious job
                            opportunities and make safer career decisions.
                        </p>

                        {/* Feature list */}
                        <div className="mt-8 space-y-4">

                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
                                    <svg
                                        width="17"
                                        height="17"
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

                                <div>
                                    <p className="text-sm font-semibold text-[#334155]">
                                        ML-powered detection
                                    </p>

                                    <p className="text-xs text-[#94A3B8]">
                                        Detect suspicious patterns in job postings
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
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
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2" />
                                        <path d="M12 20v2" />
                                        <path d="M2 12h2" />
                                        <path d="M20 12h2" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#334155]">
                                        Autonomous AI investigation
                                    </p>

                                    <p className="text-xs text-[#94A3B8]">
                                        Investigate companies and domains automatically
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
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

                                <div>
                                    <p className="text-sm font-semibold text-[#334155]">
                                        Explainable risk scores
                                    </p>

                                    <p className="text-xs text-[#94A3B8]">
                                        Understand why an opportunity was flagged
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* =================================================
                        LOGIN CARD
                    ================================================== */}

                    <div className="mx-auto w-full max-w-md">

                        {/* Mobile heading */}
                        <div className="mb-6 text-center lg:hidden">

                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F172A] text-white shadow-md">
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
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>

                            <h1 className="text-2xl font-bold text-[#0F172A]">
                                Welcome to {APP_NAME}
                            </h1>

                            <p className="mt-2 text-sm text-[#64748B]">
                                Verify job opportunities with confidence.
                            </p>
                        </div>

                        {/* Login container */}
                        <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

                            {/* Card top */}
                            <div className="border-b border-[#E2E8F0] px-6 pb-6 pt-7 sm:px-8">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                            Secure access
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A]">
                                            Sign in
                                        </h2>

                                        <p className="mt-1.5 text-sm text-[#64748B]">
                                            Continue with your Google account.
                                        </p>
                                    </div>

                                    <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] sm:flex">
                                        <svg
                                            width="21"
                                            height="21"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect
                                                x="4"
                                                y="4"
                                                width="16"
                                                height="16"
                                                rx="3"
                                            />
                                            <path d="M8 12h8" />
                                            <path d="M12 8v8" />
                                        </svg>
                                    </div>

                                </div>
                            </div>

                            {/* Card body */}
                            <div className="px-6 py-7 sm:px-8">

                                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8F9FA] p-4">

                                    <div className="mb-4 flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-sm">
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
                                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                                <polyline points="10 17 15 12 10 7" />
                                                <line
                                                    x1="15"
                                                    y1="12"
                                                    x2="3"
                                                    y2="12"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-[#334155]">
                                                Access your verification workspace
                                            </p>

                                            <p className="mt-1 text-[11px] leading-5 text-[#64748B]">
                                                Your verification history and
                                                analysis reports will be available
                                                after signing in.
                                            </p>
                                        </div>

                                    </div>

                                    {/* Existing OAuth component */}
                                    <GoogleLoginButton />
                                </div>

                                {/* Security indicators */}
                                <div className="mt-6 grid grid-cols-2 gap-3">

                                    <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981]">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6-8 10-8 10z" />
                                                    <path d="m9 12 2 2 4-4" />
                                                </svg>
                                            </span>

                                            <span className="text-[11px] font-semibold text-[#475569]">
                                                Secure
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
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
                                                </svg>
                                            </span>

                                            <span className="text-[11px] font-semibold text-[#475569]">
                                                AI powered
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Card footer */}
                            <div className="border-t border-[#E2E8F0] bg-[#FAFBFC] px-6 py-4 sm:px-8">

                                <div className="flex items-start gap-2">

                                    <svg
                                        className="mt-0.5 shrink-0 text-[#94A3B8]"
                                        width="14"
                                        height="14"
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

                                    <p className="text-[10px] leading-4 text-[#94A3B8]">
                                        By signing in, you agree to our Terms
                                        of Service and Privacy Policy. Your
                                        authentication is handled securely
                                        through Google.
                                    </p>

                                </div>
                            </div>
                        </div>

                        {/* Back link */}
                        <div className="mt-5 text-center">
                            <button
                                onClick={() => navigate("/")}
                                className="text-xs font-semibold text-[#64748B] transition-colors hover:text-[#2563EB]"
                            >
                                ← Back to {APP_NAME}
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}