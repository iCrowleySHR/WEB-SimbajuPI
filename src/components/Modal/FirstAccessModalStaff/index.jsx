import { useEffect, useState } from "react";
import Alert from "../../Alert";

// onSubmit envia para login.jsx para fazer as requisições da api

export default function FirstAccessModalStaff({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  // Limpa campos e alertas sempre que o modal abre
  useEffect(() => {
    if (isOpen) {
      setAlertMessage("");
      setEmail("");
      setNewPasswordConfirmation("");
      setTempPassword("");
      setNewPassword("");
      setAlertType("error");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!email || !tempPassword || !newPassword) {
      setAlertType("error");
      setAlertMessage("Todos os campos são obrigatórios!");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertType("error");
      setAlertMessage("Email inválido!");
      return;
    }

    // Limpa alerta
    setAlertMessage("");

    // Envia dados para o handler externo
    onSubmit({
      email,
      password: tempPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation
    });


  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Primeiro Acesso - Administrativo
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@dominio.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha Temporária
                </label>
                <input
                  type="password"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  placeholder="Senha recebida por e-mail"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite sua nova senha"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Senha (confirmação)
                </label>
                <input
                  type="password"
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  placeholder="Digite sua nova senha"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>

            {/* Renderiza o alerta apenas se houver mensagem */}
            {alertMessage && (
              <div className="mt-4">
                <Alert type={alertType} message={alertMessage} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
