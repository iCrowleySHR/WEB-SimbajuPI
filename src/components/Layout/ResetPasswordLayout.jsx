
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

export default function ResetPasswordLayout() {
    return (
        <div className="flex flex-col bg-gray-100 min-h-[111svh]">

            <main className="container mx-auto px-4 py-8 max-w-full fade-in flex-1">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            <div className="hidden md:block bg-gray-100">
                <Footer />
            </div>

        </div>
    );
}

