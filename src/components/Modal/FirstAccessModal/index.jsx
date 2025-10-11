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
  if (!isOpen) return null;

  const isBeneficiary = userType === "beneficiary";
  const title = isBeneficiary
    ? "Primeiro Acesso - Beneficiário"
    : "Primeiro Acesso - Administrativo";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isBeneficiary ? "CPF" : "Email"}
            </label>
            <input
              type={isBeneficiary ? "text" : "email"}
              value={identifier}
              onChange={(e) => setIdentifier(isBeneficiary ? maskCpf(e.target.value) : e.target.value)}
              placeholder={isBeneficiary ? "000.000.000-00" : "usuario@dominio.com"}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label>Senha Temporária</label>
            <input
              type="password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Senha recebida por e-mail"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label>Nova Senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label>Nova Senha (confirmação)</label>
            <input
              type="password"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              placeholder="Digite sua nova senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && <Alert type={type} message={message} />}

          <div className="flex space-x-3">
            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
              Confirmar
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
