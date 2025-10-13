import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import LayoutPublic from './components/Layout/Public';
import NotFound from "./pages/public/NotFound";
import LayoutPrivate from "./components/Layout/Private";

// Páginas privadas
import SecretaryHome from "./pages/auth/secretary/Home";
import WarehouseHome from "./pages/auth/warehouse/Home";
import TodaySchedulings from "./pages/auth/warehouse/TodaySchedulings";
import GeneralSettings from "./pages/auth/shared/GeneralSettings";
import UbsHome from "./pages/auth/ubs/Home";
import BeneficiaryHome from "./pages/auth/beneficiary/Home";
import NewBeneficiaryAccount from "./pages/auth/secretary/NewBeneficiaryAccount";
import NewUbsAccount from "./pages/auth/secretary/NewUbsAccount";
import NewWareAccount from "./pages/auth/secretary/NewWareAccount";
import BeneficiartyList from "./pages/auth/secretary/BeneficiaryList";
import BeneficiaryHistory from "./pages/auth/beneficiary/BeneficiaryHistory";
import CancelWithdrawal from "./pages/auth/beneficiary/CancelWithdrawal";
import ValidateBeneficiary from "./pages/auth/secretary/ValidateBeneficiary";
import BeneficiaryDetails from "./pages/auth/secretary/BeneficiaryDetails";
import ReschedulePickup from "./pages/auth/beneficiary/ReschedulePickup";
import PrivateRoute from "./components/PrivateRoute";
import BeneficiarySettings from "./pages/auth/beneficiary/BeneficiarySettings";
import SchedulingDetails from "./pages/auth/warehouse/SchedulingDetails";
import HistoryScheduling from "./pages/auth/warehouse/HistoryScheduling";

function App() {
    return (
        <>
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
                    <Route path="/secretaria" element={<PrivateRoute roles={['secretary']} />}>
                        <Route index element={<SecretaryHome />} />
                        <Route path="novo-beneficiario" element={<NewBeneficiaryAccount />} />
                        <Route path="novo-ubs" element={<NewUbsAccount />} />
                        <Route path="novo-almoxarifado" element={<NewWareAccount />} />
                        <Route path="lista-beneficiarios" element={<BeneficiartyList />} />
                        <Route path="validar-beneficio" element={<ValidateBeneficiary />} />
                        <Route path="detalhes-beneficiario/:id" element={<BeneficiaryDetails />} />
                        <Route path="configuracoes" element={<GeneralSettings />} />
                    </Route>

                    {/* Almoxarifado */}
                    <Route path="/almoxarifado"  element={<PrivateRoute roles={['warehouse']} />}>
                        <Route index element={<WarehouseHome />} />
                        <Route path="configuracoes" element={<GeneralSettings />} />
                        <Route path="agendamento/hoje" element={<TodaySchedulings />} />
                        <Route path="agendamento/historico" element={<HistoryScheduling />} />
                        <Route path="agendamento/detalhes/:id" element={<SchedulingDetails />} />
                    </Route>

                    {/* UBS */}
                    <Route path="/ubs"  element={<PrivateRoute roles={['ubs']} />}>
                        <Route index element={<UbsHome />} />
                        <Route path="configuracoes" element={<GeneralSettings />} />
                    </Route>

                    {/* Beneficiário */}
                    <Route path="/beneficiario" element={<PrivateRoute roles={['beneficiary']} />}>
                        <Route index element={<BeneficiaryHome />} />
                        <Route path="historico" element={<BeneficiaryHistory />} />
                        <Route path="cancelar-retirada" element={<CancelWithdrawal />} />
                        <Route path="reagendar-retirada" element={<ReschedulePickup />} />
                        <Route path="configuracoes" element={<BeneficiarySettings />} />
                    </Route>
                </Route>
            </Routes>
        </>

    );
}

export default App;
