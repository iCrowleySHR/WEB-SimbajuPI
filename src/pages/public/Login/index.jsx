import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginBox from '../../../components/LoginBox';
import FirstAccessModalBeneficiary from '../../../components/Modal/FirstAcessModalBeneficiary';
import FirstAccessModalStaff from '../../../components/Modal/FirstAccessModalStaff';
import { useUser } from "../../../contexts/UserContext";
import routeTable from '../../../utils/routeTable';
import useLoginApi from '../../../hook/useLogin';
import { useLoading } from "../../../contexts/LoadingContext";

export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [staffPassword, setStaffPassword] = useState('');

    const [showModalBeneficiary, setShowModalBeneficiary] = useState(false);
    const [showModalStaff, setShowModalStaff] = useState(false);

    const navigate = useNavigate();
    const { user, loading } = useUser();
    const { showLoading, hideLoading } = useLoading();

    const { beneficiaryMessage, beneficiaryType, staffMessage, staffType, loginBeneficiary, loginStaff, firstAccessBeneficiary, firstAccessStaff } = useLoginApi();

    const redirectByRole = (role) => routeTable(role);

    useEffect(() => {
        if (!loading && user) {
            navigate(redirectByRole(user.role));
        }
    }, [user, loading]);

    const handleLoginBeneficiary = async (event) => {
        event.preventDefault();
        try {
            showLoading();
            const response = await loginBeneficiary({ cpf, password });
            if (response) navigate(redirectByRole(response.role));
        } finally {
            hideLoading();
        }
    };

    const handleLoginStaff = async (event) => {
        event.preventDefault();
        try {
            showLoading();
            const response = await loginStaff({ email, password: staffPassword });
            if (response) navigate(redirectByRole(response.role));
        } finally {
            hideLoading();
        }
    };

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
                            onSubmit={handleLoginBeneficiary}
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
                            onSubmit={handleLoginStaff}
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

            <FirstAccessModalBeneficiary
                isOpen={showModalBeneficiary}
                onClose={() => setShowModalBeneficiary(false)}
                onSubmit={firstAccessBeneficiary}
            />

            <FirstAccessModalStaff
                isOpen={showModalStaff}
                onClose={() => setShowModalStaff(false)}
                onSubmit={firstAccessStaff}
            />
        </>
    );
}
