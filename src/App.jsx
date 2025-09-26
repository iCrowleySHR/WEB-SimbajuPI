import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import LayoutPublic from './components/LayoutPublic/LayoutPublic';
import LayoutPrivate from "./components/LayoutPrivate";
import SecretaryHome from "./pages/auth/secretary/Home";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <LayoutPublic>
                        <LandingPage />
                    </LayoutPublic>
                } />
                <Route path="/login" element={
                    <LayoutPublic>
                        <Login />
                    </LayoutPublic>
                } />

                // Rotas privadas
                <Route path="/secretaria" element={
                    <LayoutPrivate>
                        <SecretaryHome />
                    </LayoutPrivate>
                } />
            </Routes>
        </>
    );
}

export default App;
