import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import { lazy, Suspense, useEffect, useState } from "react";
import { useAndroidBackButton } from "../../hook/useAndroidBackButton";

const AccessibilityWidgets = lazy(
    () => import("../AccessibilityWidgets")
);

export default function LayoutPublic() {
        useAndroidBackButton();

    const [isMobile, setIsMobile] = useState(
        window.matchMedia("(max-width: 767px)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");

        const handleChange = (event) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <>
            <main className="bg-gray-100 fade-in min-h-screen flex flex-col">
                <div className="flex-1">
                    <Outlet />
                </div>
            </main>

            <div className="hidden md:block">
                <Footer />
            </div>

            {/* {!isMobile && ( */}
                <Suspense fallback={null}>
                    <AccessibilityWidgets />
                </Suspense>
            {/* )} */}
        </>
    );
}