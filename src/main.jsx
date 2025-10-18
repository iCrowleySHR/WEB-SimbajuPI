import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

function LoadingOverlayWrapper() {
  const { isLoading } = useLoading();
  return <LoadingOverlay isLoading={isLoading} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LoadingOverlayWrapper />
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </LoadingProvider>
  </StrictMode>
);
