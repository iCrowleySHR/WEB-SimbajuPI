import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginBox from '../../../components/LoginBox';
import FirstAccessModalBeneficiary from '../../../components/Modal/FirstAcessModalBeneficiary';
import FirstAccessModalStaff from '../../../components/Modal/FirstAccessModalStaff';
import { useAuth } from "../../../hook/useAuth";
import { useUser } from "../../../contexts/UserContext";
import { changePasswordTemporary } from '../../../api/routers/auth';
import getErrorMessage from '../../../utils/getErrorMessage';

export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [staffPassword, setStaffPassword] = useState('');

    const [beneficiaryMessage, setBeneficiaryMessage] = useState('');
    const [beneficiaryType, setBeneficiaryType] = useState('');
    const [staffMessage, setStaffMessage] = useState('');
    const [staffType, setStaffType] = useState('');

    const [showModalBeneficiary, setShowModalBeneficiary] = useState(false);
    const [showModalStaff, setShowModalStaff] = useState(false);

    const navigate = useNavigate();
    const { user, loading } = useUser();
    const { login } = useAuth();


    const redirectByRole = (role) => {
        const routes = {
            beneficiary: '/beneficiario',
            ubs: '/ubs',
            warehouse: '/almoxarifado',
            secretary: '/secretaria'
        };
        return routes[role] || '/login';
    };

    useEffect(() => {
        if (!loading && user) {
            navigate(redirectByRole(user.role));
        }
    }, [user, loading]);

    // --- Login Beneficiário ---
    const loginBeneficiary = async (event) => {
        event.preventDefault();

        if (!cpf || !password) {
            setBeneficiaryType('error');
            setBeneficiaryMessage('CPF e senha são obrigatórios!');
            return;
        }
        try {
            const response = await login({ cpf, password });
            setBeneficiaryType('success');
            setBeneficiaryMessage(response.message || 'Login realizado com sucesso!');
            navigate(redirectByRole(response.role));
        } catch (error) {
            setBeneficiaryType('error');
            setBeneficiaryMessage(getErrorMessage(error));
        }
    };

    // --- Login Administrativo ---
    const loginStaff = async (event) => {
        event.preventDefault();
        if (!email || !staffPassword) {
            setStaffType('error');
            setStaffMessage('Email e senha são obrigatórios!');
            return;
        }
        try {
            const response = await login({ email, password: staffPassword });
            setStaffType('success');
            setStaffMessage(response.message || 'Login realizado com sucesso!');
            navigate(redirectByRole(response.role));
        } catch (error) {
            setStaffType('error');
            setStaffMessage(getErrorMessage(error));
        }
    };

    // --- Handle Primeiro Acesso (Beneficiário) ---
    const handleFirstAccessBeneficiary = async ({ cpf, password: tempPassword, new_password: newPassword, new_password_confirmation: newPasswordConfirmation }) => {
        try {
            const response = await changePasswordTemporary({
                cpf,
                password: tempPassword,
                new_password: newPassword,
                new_password_confirmation: newPasswordConfirmation
            });

            setBeneficiaryType('success');
            setBeneficiaryMessage(response.message || 'Senha redefinida com sucesso! Faça login.');
            setShowModalBeneficiary(false);
        } catch (error) {
            setBeneficiaryType('error');
            setBeneficiaryMessage(getErrorMessage(error));
            setShowModalBeneficiary(false);
        }
    };

    // --- Handle Primeiro Acesso (Administrativo) ---
    const handleFirstAccessStaff = async ({ email, password: tempPassword, new_password: newPassword, new_password_confirmation: newPasswordConfirmation }) => {
        try {
            const response = await changePasswordTemporary({
                email,
                password: tempPassword,
                new_password: newPassword,
                new_password_confirmation: newPasswordConfirmation
            });

            setStaffType('success');
            setStaffMessage(response.message || 'Senha redefinida com sucesso! Faça login.');
            setShowModalStaff(false);
        } catch (error) {
            setStaffType('error');
            setStaffMessage(getErrorMessage(error));
            setShowModalStaff(false);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

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
                                { label: "CPF", value: cpf, onChange: e => setCpf(e.target.value), type: "text", placeholder: "000.000.000-00" },
                                { label: "Senha", value: password, onChange: e => setPassword(e.target.value), type: "password", placeholder: "Digite sua senha" },
                            ]}
                            message={{ type: beneficiaryType, text: beneficiaryMessage }}
                            onSubmit={loginBeneficiary}
                            onFirstAccessClick={() => setShowModalBeneficiary(true)}
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
                            onSubmit={loginStaff}
                            onFirstAccessClick={() => setShowModalStaff(true)}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/">
                            <button className="text-gray-600 hover:text-gray-800">
                                <i className="fas fa-arrow-left mr-2"></i>Voltar ao início
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <FirstAccessModalBeneficiary
                isOpen={showModalBeneficiary}
                onClose={() => setShowModalBeneficiary(false)}
                onSubmit={handleFirstAccessBeneficiary}
            />

            <FirstAccessModalStaff
                isOpen={showModalStaff}
                onClose={() => setShowModalStaff(false)}
                onSubmit={handleFirstAccessStaff}
            />
        </>
    );
}
