import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-[#F8F9FA] text-[#0F172A]">
            <Navbar />
            <main className="relative flex-1">
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

                    <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#DBEAFE] opacity-20 blur-3xl" />

                    <div className="absolute bottom-[-200px] right-[-150px] h-[400px] w-[400px] rounded-full bg-[#E0E7FF] opacity-15 blur-3xl" />

                </div>

                <Outlet />

            </main>
            <Footer />

        </div>
    );
}