import { useState } from 'react';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import LoginBox from '../../../components/LoginBox';
import { Link } from 'react-router-dom';
import FirstAccessModalBeneficiary from '../../../components/Modal/FirstAcessModalBeneficiary';
import FirstAccessModalStaff from '../../../components/Modal/FirstAccessModalStaff';


export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [staffPassword, setStaffPassword] = useState('');

    const [beneficiaryMessage, setBeneficiaryMessage] = useState('');
    const [beneficiaryType, setBeneficiaryType] = useState('error');
    const [staffMessage, setStaffMessage] = useState('');
    const [staffType, setStaffType] = useState('error');

    const [showModalBeneficiary, setShowModalBeneficiary] = useState(false);
    const [showModalStaff, setShowModalStaff] = useState(false);

    const showFirstAccessBeneficiary = () => setShowModalBeneficiary(true);
    const showFirstAccessStaff = () => setShowModalStaff(true);

    const handleCloseBeneficiary = () => setShowModalBeneficiary(false);
    const handleCloseStaff = () => setShowModalStaff(false);



    const loginBeneficiary = (event) => {
        event.preventDefault();
        if (cpfValidator.isValid(cpf)) {
            setBeneficiaryType('success');
            setBeneficiaryMessage('Login do beneficiário realizado com sucesso!');
        } else {
            setBeneficiaryType('error');
            setBeneficiaryMessage('CPF inválido. Verifique e tente novamente.');
        }
    };

    const loginStaff = (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setStaffType('success');
            setStaffMessage('Login administrativo realizado com sucesso!');
        } else {
            setStaffType('error');
            setStaffMessage('Email inválido. Verifique e tente novamente.');
        }
    };


    return (
        <>
            <div className="container mx-auto px-4 py-12 ">
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
                            onFirstAccessClick={showFirstAccessBeneficiary}
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
                            onFirstAccessClick={showFirstAccessStaff}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/">
                            <button
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>Voltar ao início
                            </button>
                        </Link>

                    </div>
                </div>
            </div>

            <FirstAccessModalBeneficiary
                isOpen={showModalBeneficiary}
                onClose={handleCloseBeneficiary}
                onSubmit={({ cpf, tempPassword, newPassword }) => {
                    console.log(cpf, tempPassword, newPassword);
                    handleCloseBeneficiary();
                }}
            />

            <FirstAccessModalStaff
                isOpen={showModalStaff}
                onClose={handleCloseStaff}
                onSubmit={({ email, tempPassword, newPassword }) => {
                    console.log(email, tempPassword, newPassword);
                    handleCloseStaff();
                }}
            />
        </>
    );
}
