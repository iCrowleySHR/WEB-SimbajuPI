import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import LayoutPublic from './components/LayoutPublic';
import NotFound from "./pages/public/NotFound";
import LayoutPrivate from "./components/LayoutPrivate";

// Páginas privadas
import SecretaryHome from "./pages/auth/secretary/Home";
import WarehouseHome from "./pages/auth/warehouse/Home";
import UbsHome from "./pages/auth/ubs/Home";
import BeneficiaryHome from "./pages/auth/beneficiary/Home";
import SecretaryNewBeneficiary from "./pages/auth/secretary/SecretaryNewBeneficiary";
import NewUbsAccount from "./pages/auth/secretary/NewUbsAccount";
import NewWareAccount from "./pages/auth/secretary/NewWareAccount";
import BeneficiartyList from "./pages/auth/secretary/BeneficiaryList";
import BeneficiaryHistory from "./pages/auth/beneficiary/BeneficiaryHistory";

function App() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route element={<LayoutPublic />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Rotas privadas */}
            <Route element={<LayoutPrivate />}>

                {/* Secretaria */}
                <Route path="/secretaria">
                    <Route index element={<SecretaryHome />} />
                    <Route path="novo-beneficiario" element={<SecretaryNewBeneficiary />} />
                    <Route path="novo-ubs" element={<NewUbsAccount />} />
                    <Route path="novo-almoxarifado" element={<NewWareAccount />} />
                    <Route path="lista-beneficiarios" element={<BeneficiartyList />}/>
                </Route>

                {/* Almoxarifado */}
                <Route path="/almoxarifado">
                    <Route index element={<WarehouseHome />} />
                </Route>

                {/* UBS */}
                <Route path="/ubs" element={<UbsHome />} />

                {/* Beneficiário */}
                <Route path="/beneficiario" >
                    <Route index element={<BeneficiaryHome />} />
                    <Route path="historico" element={<BeneficiaryHistory/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
