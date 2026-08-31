import { useEffect } from "react";
import { App } from "@capacitor/app";
import { useNavigate } from "react-router-dom";

export function useAndroidBackButton() {
    const navigate = useNavigate();

    useEffect(() => {
        const listener = App.addListener("backButton", ({ canGoBack }) => {
            if (canGoBack) {
                navigate(-1);
            } else {
                App.exitApp();
            }
        });

        return () => {
            listener.then((handle) => handle.remove());
        };
    }, [navigate]);
}