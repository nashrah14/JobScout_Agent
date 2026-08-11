/**
 * Navigation Bar Component.
 *
 * Clean application navigation with:
 * - App branding
 * - User account dropdown
 * - Dashboard / Verify / History inside account menu
 * - Sign out inside account menu
 */

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { APP_NAME } from "../../constants";

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);

    /* ================================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ================================================================= */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /* ================================================================
       LOGOUT
    ================================================================= */

    const handleLogout = async () => {
        setIsMenuOpen(false);

        try {
            await logout();
            navigate("/");
        } catch {
            // Stay on current page if logout fails.
        }
    };

    /* ================================================================
       USER INITIAL
    ================================================================= */

    const userInitial =
        user?.name?.charAt(0)?.toUpperCase() ||
        user?.email?.charAt(0)?.toUpperCase() ||
        "U";

    return (
        <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* =====================================================
                    BRAND
                ====================================================== */}

                <Link
                    to="/"
                    className="flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] shadow-sm">

                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>

                    </div>

                    <div className="hidden sm:block">
                        <p className="text-base font-bold tracking-tight text-[#0F172A]">
                            {APP_NAME}
                        </p>

                        <p className="text-[9px] font-medium tracking-wide text-[#94A3B8]">
                            AI-POWERED JOB VERIFICATION
                        </p>
                    </div>

                    <span className="text-base font-bold tracking-tight text-[#0F172A] sm:hidden">
                        {APP_NAME}
                    </span>
                </Link>

                {/* =====================================================
                    RIGHT SIDE
                ====================================================== */}

                <div className="flex items-center">

                    {isAuthenticated ? (
                        <div
                            ref={menuRef}
                            className="relative"
                        >

                            {/* =================================================
                                ACCOUNT BUTTON
                            ================================================== */}

                            <button
                                type="button"
                                onClick={() =>
                                    setIsMenuOpen((open) => !open)
                                }
                                aria-expanded={isMenuOpen}
                                aria-haspopup="menu"
                                className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all sm:gap-3 sm:px-2.5 ${
                                    isMenuOpen
                                        ? "border-[#BFDBFE] bg-[#EFF6FF]"
                                        : "border-transparent hover:border-[#E2E8F0] hover:bg-[#F8F9FA]"
                                }`}
                            >

                                {/* Avatar */}
                                {user?.picture ? (
                                    <img
                                        src={user.picture}
                                        alt={user?.name || "User"}
                                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-sm font-bold text-white">
                                        {userInitial}
                                    </div>
                                )}

                                {/* Name */}
                                <div className="hidden text-left sm:block">
                                    <p className="max-w-[130px] truncate text-sm font-semibold text-[#334155]">
                                        {user?.name || "Account"}
                                    </p>

                                    <p className="text-[10px] text-[#94A3B8]">
                                        My account
                                    </p>
                                </div>

                                {/* Chevron */}
                                <svg
                                    className={`hidden h-4 w-4 text-[#64748B] transition-transform sm:block ${
                                        isMenuOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>

                            </button>

                            {/* =================================================
                                DROPDOWN
                            ================================================== */}

                            {isMenuOpen && (
                                <div
                                    className="absolute right-0 mt-3 w-72 origin-top-right overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                                    role="menu"
                                >

                                    {/* =========================================
                                        ACCOUNT HEADER
                                    ========================================== */}

                                    <div className="border-b border-[#E2E8F0] bg-[#F8F9FA] px-4 py-4">

                                        <div className="flex items-center gap-3">

                                            {user?.picture ? (
                                                <img
                                                    src={user.picture}
                                                    alt={user?.name || "User"}
                                                    className="h-11 w-11 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-sm font-bold text-white">
                                                    {userInitial}
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-[#0F172A]">
                                                    {user?.name || "User"}
                                                </p>

                                                <p className="mt-0.5 truncate text-xs text-[#64748B]">
                                                    {user?.email || "Signed in"}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="mt-3 flex items-center gap-2">

                                            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />

                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#047857]">
                                                Account active
                                            </span>

                                        </div>
                                    </div>

                                    {/* =========================================
                                        NAVIGATION
                                    ========================================== */}

                                    <div className="p-2">

                                        {/* Dashboard */}
                                        <Link
                                            to="/dashboard"
                                            onClick={() =>
                                                setIsMenuOpen(false)
                                            }
                                            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#F8F9FA]"
                                            role="menuitem"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB] transition-colors group-hover:bg-[#DBEAFE]">

                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <rect
                                                        x="3"
                                                        y="3"
                                                        width="7"
                                                        height="7"
                                                        rx="1"
                                                    />
                                                    <rect
                                                        x="14"
                                                        y="3"
                                                        width="7"
                                                        height="7"
                                                        rx="1"
                                                    />
                                                    <rect
                                                        x="3"
                                                        y="14"
                                                        width="7"
                                                        height="7"
                                                        rx="1"
                                                    />
                                                    <rect
                                                        x="14"
                                                        y="14"
                                                        width="7"
                                                        height="7"
                                                        rx="1"
                                                    />
                                                </svg>

                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#334155]">
                                                    Dashboard
                                                </p>

                                                <p className="text-[10px] text-[#94A3B8]">
                                                    Overview & activity
                                                </p>
                                            </div>

                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#CBD5E1]"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>

                                        </Link>

                                        {/* Verify */}
                                        <Link
                                            to="/verify"
                                            onClick={() =>
                                                setIsMenuOpen(false)
                                            }
                                            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#F8F9FA]"
                                            role="menuitem"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#10B981] transition-colors group-hover:bg-[#D1FAE5]">

                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M12 5v14" />
                                                    <path d="M5 12h14" />
                                                </svg>

                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#334155]">
                                                    Verify a Job
                                                </p>

                                                <p className="text-[10px] text-[#94A3B8]">
                                                    Scan a new opportunity
                                                </p>
                                            </div>

                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#CBD5E1]"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>

                                        </Link>

                                        {/* History */}
                                        <Link
                                            to="/history"
                                            onClick={() =>
                                                setIsMenuOpen(false)
                                            }
                                            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#F8F9FA]"
                                            role="menuitem"
                                        >
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F9FA] text-[#64748B] transition-colors group-hover:bg-[#F1F5F9]">

                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="9"
                                                    />
                                                    <path d="M12 7v5l3 2" />
                                                </svg>

                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#334155]">
                                                    Verification History
                                                </p>

                                                <p className="text-[10px] text-[#94A3B8]">
                                                    View previous analyses
                                                </p>
                                            </div>

                                            <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#CBD5E1]"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>

                                        </Link>

                                    </div>

                                    {/* =========================================
                                        DIVIDER
                                    ========================================== */}

                                    <div className="mx-4 border-t border-[#E2E8F0]" />

                                    {/* =========================================
                                        SIGN OUT
                                    ========================================== */}

                                    <div className="p-2">

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-[#FEF2F2]"
                                            role="menuitem"
                                        >

                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FEF2F2] text-[#EF4444] transition-colors group-hover:bg-[#FEE2E2]">

                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M10 17l5-5-5-5" />
                                                    <path d="M15 12H3" />
                                                    <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                                                </svg>

                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#B91C1C]">
                                                    Sign Out
                                                </p>

                                                <p className="text-[10px] text-[#94A3B8]">
                                                    End your current session
                                                </p>
                                            </div>

                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* =================================================
                           NOT AUTHENTICATED
                        ================================================== */

                        <Link
                            to="/login"
                            className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] hover:shadow-md"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}