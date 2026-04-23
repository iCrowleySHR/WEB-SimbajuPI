import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginBox from '../../../components/LoginBox';
import FirstAccessModal from '../../../components/Modal/FirstAccessModal';
import { useUser } from "../../../contexts/UserContext";
import useLogin from '../../../hook/useLogin';
import useFirstAccessModal from '../../../hook/useFirstAccessModal';
import { maskCpf } from '../../../utils/mask';

export default function Login() {
    const { user, loading } = useUser();
    const [showModalBeneficiary, setShowModalBeneficiary] = useState(false);
    const [showModalStaff, setShowModalStaff] = useState(false);
    const [activeTab, setActiveTab] = useState('beneficiary'); // 'beneficiary' ou 'staff'

    // --- Login Hook ---
    const {
        cpf, setCpf,
        password, setPassword,
        email, setEmail,
        staffPassword, setStaffPassword,
        beneficiaryMessage, beneficiaryType,
        staffMessage, staffType,
        submitBeneficiary,
        submitStaff
    } = useLogin(user, loading);

    const beneficiaryHook = useFirstAccessModal("beneficiary");
    const staffHook = useFirstAccessModal("staff");

    return (
        <>
            <div className="container mx-auto px-4 py-12 pb-59 pt-27 ">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <i className="fas fa-user-circle text-6xl text-blue-600 mb-4"></i>
                        <h2 className="text-3xl font-bold text-gray-800">Acesso ao Sistema</h2>
                        <p className="text-gray-600 mt-2">Selecione seu tipo de acesso</p>
                    </div>

                    {/* Tabs para selecionar o tipo de acesso */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                onClick={() => setActiveTab('beneficiary')}
                                className={`px-6 py-3 text-sm font-medium rounded-l-lg border ${
                                    activeTab === 'beneficiary'
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                                disabled={loading}
                            >
                                <i className="fas fa-user mr-2"></i>
                                Acesso Beneficiário
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('staff')}
                                className={`px-6 py-3 text-sm font-medium rounded-r-lg border-t border-b border-r ${
                                    activeTab === 'staff'
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                                disabled={loading}
                            >
                                <i className="fas fa-user-tie mr-2"></i>
                                Acesso Administrativo
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {activeTab === 'beneficiary' ? (
                            <LoginBox
                                type="Acesso Beneficiário"
                                icon="fas fa-user"
                                color="blue"
                                fields={[
                                    { label: "CPF", value: cpf, onChange: e => setCpf(maskCpf(e.target.value)), type: "text", placeholder: "000.000.000-00" },
                                    { label: "Senha", value: password, onChange: e => setPassword(e.target.value), type: "password", placeholder: "Digite sua senha" },
                                ]}
                                message={{ type: beneficiaryType, text: beneficiaryMessage }}
                                onSubmit={submitBeneficiary}
                                onFirstAccessClick={() => setShowModalBeneficiary(true)}
                                disabled={loading}
                                forgotPasswordLink="/email/token"
                            />
                        ) : (
                            <LoginBox
                                type="Acesso Administrativo"
                                icon="fas fa-user-tie"
                                color="green"
                                fields={[
                                    { label: "Email", value: email, onChange: e => setEmail(e.target.value), type: "email", placeholder: "seu@email.com" },
                                    { label: "Senha", value: staffPassword, onChange: e => setStaffPassword(e.target.value), type: "password", placeholder: "Digite sua senha" },
                                ]}
                                message={{ type: staffType, text: staffMessage }}
                                onSubmit={submitStaff}
                                onFirstAccessClick={() => setShowModalStaff(true)}
                                disabled={loading}
                                forgotPasswordLink="/email/token"
                            />
                        )}
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/">
                            <button className="text-gray-600 hover:text-gray-800" disabled={loading}>
                                <i className="fas fa-arrow-left mr-2"></i>Voltar ao início
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <FirstAccessModal
                isOpen={showModalBeneficiary}
                onClose={() => setShowModalBeneficiary(false)}
                userType="beneficiary"
                identifier={beneficiaryHook.identifier}
                setIdentifier={beneficiaryHook.setIdentifier}
                tempPassword={beneficiaryHook.tempPassword}
                setTempPassword={beneficiaryHook.setTempPassword}
                newPassword={beneficiaryHook.newPassword}
                setNewPassword={beneficiaryHook.setNewPassword}
                newPasswordConfirmation={beneficiaryHook.newPasswordConfirmation}
                setNewPasswordConfirmation={beneficiaryHook.setNewPasswordConfirmation}
                message={beneficiaryHook.message}
                type={beneficiaryHook.type}
                onSubmit={beneficiaryHook.handleFirstAccess}
            />

            <FirstAccessModal
                isOpen={showModalStaff}
                onClose={() => setShowModalStaff(false)}
                userType="staff"
                identifier={staffHook.identifier}
                setIdentifier={staffHook.setIdentifier}
                tempPassword={staffHook.tempPassword}
                setTempPassword={staffHook.setTempPassword}
                newPassword={staffHook.newPassword}
                setNewPassword={staffHook.setNewPassword}
                newPasswordConfirmation={staffHook.newPasswordConfirmation}
                setNewPasswordConfirmation={staffHook.setNewPasswordConfirmation}
                message={staffHook.message}
                type={staffHook.type}
                onSubmit={staffHook.handleFirstAccess}
            />
        </>
    );
}