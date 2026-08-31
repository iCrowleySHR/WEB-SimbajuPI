import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import AccessibilityWidgets from "../AccessibilityWidgets";

export default function LayoutPublic() {
    return (
        <>
            {/* <NavBarLandingPage /> */}
            
            <main className="bg-gray-100 fade-in min-h-screen flex flex-col">
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>

            <div className="hidden md:block">
                <Footer />
            </div>

            <AccessibilityWidgets />
        </>
    );
}