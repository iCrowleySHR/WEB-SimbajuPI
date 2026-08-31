import { useEffect } from "react";

export default function AccessibilityWidgets() {
    useEffect(() => {
        // Evita carregar novamente se já existir
        if (document.getElementById("userway-script")) {
            return;
        }

        // =========================
        // USERWAY
        // =========================

        const userWayScript = document.createElement("script");

        userWayScript.id = "userway-script";
        userWayScript.src = "https://cdn.userway.org/widget.js";
        userWayScript.setAttribute(
            "data-account",
            "KmNQWOhE4K"
        );
        userWayScript.async = true;

        document.body.appendChild(userWayScript);


        // =========================
        // VLIBRAS
        // =========================

        const vlibrasContainer = document.createElement("div");

        vlibrasContainer.id = "vlibras-container";
        vlibrasContainer.setAttribute("vw", "");
        vlibrasContainer.className = "enabled";

        vlibrasContainer.innerHTML = `
            <div vw-access-button class="active"></div>

            <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
            </div>
        `;

        document.body.appendChild(vlibrasContainer);

        const vlibrasScript = document.createElement("script");

        vlibrasScript.id = "vlibras-script";
        vlibrasScript.src =
            "https://vlibras.gov.br/app/vlibras-plugin.js";
        vlibrasScript.async = true;

        vlibrasScript.onload = () => {
            if (window.VLibras) {
                new window.VLibras.Widget(
                    "https://vlibras.gov.br/app"
                );
            }
        };

        document.body.appendChild(vlibrasScript);
    }, []);

    return null;
}