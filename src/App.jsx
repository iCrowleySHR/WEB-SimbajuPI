import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import LayoutPublic from './components/LayoutPublic';
import LayoutPrivate from "./components/LayoutPrivate";

// Páginas privadas
import SecretaryHome from "./pages/auth/secretary/Home";
import WarehouseHome from "./pages/auth/warehouse/Home";
import UbsHome from "./pages/auth/ubs/Home";
import BeneficiaryHome from "./pages/auth/beneficiary/Home";

function App() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route element={<LayoutPublic />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Rotas privadas */}
            <Route element={<LayoutPrivate />}>
                {/* Secretaria */}
                <Route path="/secretaria">
                    <Route index element={<SecretaryHome />} />
                    {/* /secretaria/configurações */}
                    {/* <Route path="configuracoes" element={<SecretaryConfig />} /> */}
                </Route>

                {/* Almoxarifado */}
                <Route path="/almoxarifado" element={<WarehouseHome />} />

                {/* UBS */}
                <Route path="/ubs" element={<UbsHome />} />

                {/* Beneficiário */}
                <Route path="/beneficiario" element={<BeneficiaryHome />} />
            </Route>
        </Routes>
    );
}

export default App;
