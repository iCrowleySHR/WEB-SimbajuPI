import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import LayoutPublic from './components/LayoutPublic';
import LayoutPrivate from "./components/LayoutPrivate";
import SecretaryHome from "./pages/auth/secretary/Home";
import WarehouseHome from "./pages/auth/warehouse/Home";
import UbsHome from "./pages/auth/ubs/Home";

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

                <Route path="/almoxarifado" element={
                    <LayoutPrivate>
                        <WarehouseHome />
                    </LayoutPrivate>
                } />

                <Route path="/ubs" element={
                    <LayoutPrivate>
                        <UbsHome />
                    </LayoutPrivate>
                } />
            </Routes>
        </>
    );
}

export default App;
