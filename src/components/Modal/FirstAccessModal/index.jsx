import { useEffect, useState } from "react";
import Alert from "../../Alert";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { maskCpf } from "../../../utils/mask";

export default function FirstAccessModal({
  isOpen,
  onClose,
  userType = "beneficiary",
  identifier, setIdentifier,
  tempPassword, setTempPassword,
  newPassword, setNewPassword,
  newPasswordConfirmation, setNewPasswordConfirmation,
  message, type,
  onSubmit
}) {
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (newPassword) {
      let strength = 0;
      if (newPassword.length >= 8) strength += 25;
      if (/[A-Z]/.test(newPassword)) strength += 25;
      if (/[0-9]/.test(newPassword)) strength += 25;
      if (/[^A-Za-z0-9]/.test(newPassword)) strength += 25;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Fraca";
    if (passwordStrength <= 50) return "Moderada";
    if (passwordStrength <= 75) return "Boa";
    return "Forte";
  };

  if (!isOpen) return null;

  const isBeneficiary = userType === "beneficiary";
  const title = isBeneficiary
    ? "Primeiro Acesso - Beneficiário"
    : "Primeiro Acesso - Administrativo";

  const icon = isBeneficiary ? "fas fa-user" : "fas fa-user-shield";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40  transition-opacity "
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <i className={`${icon} text-blue-600 text-xl`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure sua senha de acesso
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Identifier Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              {isBeneficiary ? "CPF" : "Email"}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type={isBeneficiary ? "text" : "email"}
                value={identifier}
                onChange={(e) => setIdentifier(isBeneficiary ? maskCpf(e.target.value) : e.target.value)}
                placeholder={isBeneficiary ? "000.000.000-00" : "usuario@dominio.com"}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                required
              />
              <i className={`absolute right-3 top-3 text-gray-400 ${isBeneficiary ? 'fas fa-id-card' : 'fas fa-envelope'}`}></i>
            </div>
          </div>

          {/* Temporary Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Senha Temporária
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder="Senha recebida por e-mail"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                required
              />
              <i className="fas fa-key absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Nova Senha
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                required
              />
              <i className="fas fa-lock absolute right-3 top-3 text-gray-400"></i>
            </div>
            
            {/* Password Strength Meter */}
            {newPassword && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Força da senha:</span>
                  <span className={`font-semibold ${
                    passwordStrength <= 25 ? 'text-red-600' :
                    passwordStrength <= 50 ? 'text-yellow-600' :
                    passwordStrength <= 75 ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Password Confirmation */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Confirmar Nova Senha
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                placeholder="Digite novamente sua nova senha"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                  newPasswordConfirmation && newPassword !== newPasswordConfirmation
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                required
              />
              <i className={`fas ${
                newPasswordConfirmation && newPassword === newPasswordConfirmation
                  ? 'fa-check text-green-500'
                  : 'fa-lock text-gray-400'
              } absolute right-3 top-3`}></i>
            </div>
            {newPasswordConfirmation && newPassword !== newPasswordConfirmation && (
              <p className="text-red-600 text-xs flex items-center">
                <i className="fas fa-exclamation-triangle mr-1"></i>
                As senhas não coincidem
              </p>
            )}
          </div>

          {/* Alert Message */}
          {message && (
            <div className="mt-2">
              <Alert type={type} message={message} />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:ring-4 focus:ring-green-200 shadow-lg"
            >
              <i className="fas fa-check-circle mr-2"></i>
              Confirmar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:ring-4 focus:ring-gray-200 shadow-lg"
            >
              <i className="fas fa-times mr-2"></i>
              Cancelar
            </button>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-t-2xl"></div>
      </div>
    </div>
  );
}