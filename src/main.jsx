import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay";

function LoadingOverlayWrapper() {
  const { isLoading } = useLoading();
  return <LoadingOverlay isLoading={isLoading} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <LoadingOverlayWrapper /> 
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </LoadingProvider>
  </StrictMode>
);
