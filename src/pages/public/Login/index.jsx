import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import Alert from '../../../components/Alert';

export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');      
    const [type, setType] = useState('error');       

    const login = (event) => {
        event.preventDefault();
        {/* Aplicar logica ainda para aceitar email, mas já verifica cpf */}
        if (cpfValidator.isValid(cpf)) {
            setType('success');
            setMessage('Login realizado com sucesso!');

        } else {
            setType('error');
            setMessage('CPF inválido. Verifique e tente novamente.');
        }
    };

    const showFirstAccess = () => {
        alert('criar logica ainda');
    };

    return (
        <div className="container mx-auto px-4 py-25">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <i className="fas fa-user-circle text-6xl text-blue-600 mb-4"></i>
                    <h2 className="text-2xl font-bold text-gray-800">Acesso ao Sistema</h2>
                    <p className="text-gray-600 mt-2">Entre com suas credenciais</p>
                </div>

                <form onSubmit={login} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CPF ou Email</label>
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

                    {/* Usando o Alert */}
                    <Alert type={type} message={message} />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                        <i className="fas fa-sign-in-alt mr-2"></i>Entrar
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={showFirstAccess}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Primeiro acesso? Clique aqui
                    </button>
                    <br />
                    <Link to="/">
                        <button
                            className="text-gray-600 hover:text-gray-800 text-sm mt-2"
                        >
                            <i className="fas fa-arrow-left mr-1"></i>Voltar ao início
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
