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
import BeneficiaryDetails from "./pages/auth/shared/BeneficiaryDetails";
import PrivateRoute from "./components/PrivateRoute";
import BeneficiarySettings from "./pages/auth/beneficiary/BeneficiarySettings";
import SchedulingDetails from "./pages/auth/shared/SchedulingDetails";
import HistoryScheduling from "./pages/auth/shared/HistoryScheduling";
import AllBeneficiaries from "./pages/auth/shared/AllBenenficiaries";
import HistoryWithdrawal from "./pages/auth/shared/HistoryWithdrawal";
import WithdrawalDetails from "./pages/auth/shared/WithdrawalDetails";
import SemiannualReassessment from "./pages/auth/shared/SemiannualReassessment";
import EditPrescription from "./pages/auth/secretary/EditPrescription";
import DisableBeneficiaryAccount from "./pages/auth/secretary/DisableBeneficiaryAccount";
import BeneficiariesDisabled from "./pages/auth/secretary/BeneficiariesDisabled";
import MyHistoryWithdrawal from "./pages/auth/beneficiary/MyHistoryWithdrawal";
import MyHistoryScheduling from "./pages/auth/beneficiary/MyHistoryScheduling";
import ListBeneficiariesStatusUbs from "./pages/auth/secretary/ListBeneficiariesStatusUbs";
import BeneficiaryStatusSecretary from "./pages/auth/secretary/BeneficiaryStatusSecretary";
import BeneficiaryStatusUbs from "./pages/auth/ubs/BeneficiaryStatusUbs";
import CancelScheduling from "./pages/auth/shared/CancelScheduling";
import CancebleListScheduling from "./pages/auth/beneficiary/CancebleScheduling";
import AusentScheduling from "./pages/auth/warehouse/AusentScheduling";
import WarehouseConfig from "./pages/auth/warehouse/WarehouseConfig";
import Reports from "./pages/auth/shared/Reports";
import MakeScheduling from "./pages/auth/shared/MakeScheduling";
import MakeWithdrawal from "./pages/auth/warehouse/MakeWithdrawal";


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

                        <Route path="beneficiario/ultima-veriricacao" element={<SemiannualReassessment />} />
                        <Route path="beneficiario/desabilitar-conta/:id" element={<DisableBeneficiaryAccount />} />
                        <Route path="beneficiario/editar/prescricao/:id" element={<EditPrescription />} />
                        <Route path="beneficiario/detalhes/:id" element={<BeneficiaryDetails />} />
                        <Route path="beneficiario/lista" element={<AllBeneficiaries />} />
                        <Route path="beneficiario/editar/status/:id" element={<BeneficiaryStatusSecretary />} />
                        <Route path="beneficiario/desativados" element={<BeneficiariesDisabled />} />
                        <Route path="beneficiario/status/suspensoes/ubs" element={<ListBeneficiariesStatusUbs />} />

                        <Route path="configuracoes" element={<GeneralSettings />} />

                        <Route path="relatorios" element={<Reports />} />

                        <Route path="agendamento/lista" element={<HistoryScheduling />} />
                        <Route path="agendamento/detalhes/:id" element={<SchedulingDetails />} />

                        <Route path="retirada/lista" element={<HistoryWithdrawal />} />
                        <Route path="retirada/detalhes/:id" element={<WithdrawalDetails />} />
                    </Route>

                    {/* Almoxarifado */}
                    <Route path="/almoxarifado"  element={<PrivateRoute roles={['warehouse']} />}>
                        <Route index element={<WarehouseHome />} />
                        <Route path="configuracoes" element={<GeneralSettings />} />
                        <Route path="configuracoes/funcionamento" element={<WarehouseConfig />} />

                        <Route path="relatorios" element={<Reports />} />

                        <Route path="agendamento/hoje" element={<TodaySchedulings />} />
                        <Route path="agendamento/criar/:id?" element={<MakeScheduling />} />
                        <Route path="agendamento/lista" element={<HistoryScheduling />} />
                        <Route path="agendamento/cancelar/:id" element={<CancelScheduling />} />
                        <Route path="agendamento/ausente/:id" element={<AusentScheduling />} />
                        <Route path="agendamento/detalhes/:id" element={<SchedulingDetails />} />

                        <Route path="beneficiario/lista" element={<AllBeneficiaries />} />
                        <Route path="beneficiario/detalhes/:id" element={<BeneficiaryDetails />} />

                        <Route path="retirada/lista" element={<HistoryWithdrawal />} />
                        <Route path="retirada/registrar" element={<MakeWithdrawal />} />
                        <Route path="retirada/detalhes/:id" element={<WithdrawalDetails />} />
                    </Route>

                    {/* UBS */}
                    <Route path="/ubs"  element={<PrivateRoute roles={['ubs']} />}>
                        <Route index element={<UbsHome />} />
                        <Route path="configuracoes" element={<GeneralSettings />} />

                        <Route path="beneficiario/detalhes/:id" element={<BeneficiaryDetails />} />
                        <Route path="beneficiario/lista" element={<AllBeneficiaries />} />
                        <Route path="beneficiario/ultima-veriricacao" element={<SemiannualReassessment />} />
                        <Route path="beneficiario/editar/status/:id" element={<BeneficiaryStatusUbs />} />
                    </Route>

                    {/* Beneficiário */}
                    <Route path="/beneficiario" element={<PrivateRoute roles={['beneficiary']} />}>
                        <Route index element={<BeneficiaryHome />} />
                        <Route path="retirada/historico" element={<MyHistoryWithdrawal />} />

                        <Route path="dados" element={<BeneficiaryDetails />} />

                        <Route path="agendamento/historico" element={<MyHistoryScheduling />} />
                        <Route path="agendamento/criar" element={<MakeScheduling />} />
                        <Route path="agendamento/cancelaveis" element={<CancebleListScheduling />} />
                        <Route path="agendamento/cancelar/:id" element={<CancelScheduling />} />

                        <Route path="configuracoes" element={<BeneficiarySettings />} />
                    </Route>
                </Route>
            </Routes>
        </>

    );
}

export default App;
