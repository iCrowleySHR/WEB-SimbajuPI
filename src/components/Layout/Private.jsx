import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import NavBarAuth from "../NavBar/NavBarAuth";
import { lazy, Suspense, useEffect, useState } from "react";
import { useAndroidBackButton } from "../../hook/useAndroidBackButton";

const AccessibilityWidgets = lazy(
    () => import("../AccessibilityWidgets")
);

export default function LayoutPrivate() {
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
            <NavBarAuth />

            <main className="container mx-auto px-4 py-8 bg-gray-100 max-w-full fade-in min-h-screen">
                <div className="max-w-7xl mx-auto">
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