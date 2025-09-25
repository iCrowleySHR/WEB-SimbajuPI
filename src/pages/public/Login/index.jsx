import { useState } from 'react';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import Alert from '../../../components/Alert';
import { Link } from 'react-router-dom';
import FirstAccessModalBeneficiary from '../../../components/FirstAcessModalBeneficiary';
import FirstAccessModalStaff from '../../../components/FirstAccessModalStaff';


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
                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <div className="text-center mb-6">
                                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-user text-3xl text-blue-600"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Acesso do Beneficiário</h3>
                                <p className="text-gray-600 mt-2">Para pacientes e responsáveis</p>
                            </div>

                            <form onSubmit={loginBeneficiary} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                                    <input
                                        type="text"
                                        placeholder="000.000.000-00"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                                    <input
                                        type="password"
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {beneficiaryMessage && <Alert type={beneficiaryType} message={beneficiaryMessage} />}


                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    <i className="fas fa-sign-in-alt mr-2"></i>Entrar como Beneficiário
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={showFirstAccessBeneficiary}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Primeiro acesso? Clique aqui
                                </button>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <div className="text-center mb-6">
                                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-user-tie text-3xl text-green-600"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Acesso Administrativo</h3>
                                <p className="text-gray-600 mt-2">Para funcionários e profissionais</p>
                            </div>

                            <form onSubmit={loginStaff} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                                    <input
                                        type="password"
                                        placeholder="Digite sua senha"
                                        value={staffPassword}
                                        onChange={(e) => setStaffPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                {staffMessage && <Alert type={staffType} message={staffMessage} />}


                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    <i className="fas fa-sign-in-alt mr-2"></i>Entrar como Funcionário
                                </button>


                            </form>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={showFirstAccessStaff}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    Primeiro acesso? Clique aqui
                                </button>
                            </div>
                        </div>
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
                    handleCloseBeneficiary();
                }}
            />

            <FirstAccessModalStaff
                isOpen={showModalStaff}
                onClose={handleCloseStaff}
                onSubmit={({ email, tempPassword, newPassword }) => {
                    handleCloseStaff();
                }}
            />
        </>
    );
}
