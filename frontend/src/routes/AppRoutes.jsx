import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";


const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const VerifyPage = lazy(() => import("../pages/VerifyPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const HistoryPage = lazy(() => import("../pages/HistoryPage"));
const HistoryDetailPage = lazy(
    () => import("../pages/HistoryDetailPage")
);

const NotFoundPage = lazy(
    () => import("../pages/NotFoundPage")
);

function LazyFallback() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-[#F8F9FA] px-4">

            <div className="flex flex-col items-center">

                {/* Loading icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF]">

                    <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />

                </div>

                {/* Loading text */}
                <p className="mt-4 text-sm font-semibold text-[#334155]">
                    Loading JobScout Agent
                </p>

                <p className="mt-1 text-xs text-[#94A3B8]">
                    Preparing your verification workspace...
                </p>

            </div>

        </div>
    );
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<LazyFallback />}>

            <Routes>

                <Route element={<MainLayout />}>

                    {/* Public landing page */}
                    <Route
                        path="/"
                        element={<LandingPage />}
                    />

                    {/* Authentication */}
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    {/* Job verification */}
                    <Route
                        path="/verify"
                        element={<VerifyPage />}
                    />

                    {/* User dashboard */}
                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    {/* Verification history */}
                    <Route
                        path="/history"
                        element={<HistoryPage />}
                    />

                    {/* Verification details */}
                    <Route
                        path="/history/:id"
                        element={<HistoryDetailPage />}
                    />

                    {/* 404 */}
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />

                </Route>

            </Routes>

        </Suspense>
    );
}