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
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <i className="fas fa-user-circle text-6xl text-blue-600 mb-4"></i>
                        <h2 className="text-3xl font-bold text-gray-800">Acesso ao Sistema</h2>
                        <p className="text-gray-600 mt-2">Selecione seu tipo de acesso</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <LoginBox
                            type="Acesso do Beneficiário"
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
                        />

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
                        />
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
