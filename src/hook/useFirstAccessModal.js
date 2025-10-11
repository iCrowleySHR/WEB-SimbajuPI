import { useState } from "react";
import { changePasswordTemporary } from "../api/routers/auth";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { sanitizeCpf } from "../utils/sanitize";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export default function useFirstAccessModal(userType = "beneficiary") {
    const { showLoading, hideLoading } = useLoading();

    // Campos do formulário
    const [identifier, setIdentifier] = useState("");
    const [tempPassword, setTempPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    // Mensagens
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const handleFirstAccess = async (e) => {
        e.preventDefault();

        // Validação de campos
        if (!identifier || !tempPassword || !newPassword) {
            setType("error");
            setMessage("Todos os campos são obrigatórios!");
            return;
        }

        // Validação CPF ou Email
        if (userType === "beneficiary" && !cpfValidator.isValid(identifier)) {
            setType("error");
            setMessage("CPF inválido!");
            return;
        }

        if (userType === "staff") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(identifier)) {
                setType("error");
                setMessage("Email inválido!");
                return;
            }
        }

        try {
            showLoading();

            const payload = userType === "beneficiary"
                ? { cpf: sanitizeCpf(identifier), password: tempPassword, new_password: newPassword, new_password_confirmation: newPasswordConfirmation }
                : { email: identifier, password: tempPassword, new_password: newPassword, new_password_confirmation: newPasswordConfirmation };

            const response = await changePasswordTemporary(payload);

            setIdentifier("");
            setTempPassword("");
            setNewPassword("");
            setNewPasswordConfirmation("");
            setType("success");
            setMessage(response.message || "Senha redefinida com sucesso!");
            return response;

        } catch (error) {
            setType("error");
            setMessage(getErrorMessage(error));
        } finally {
            hideLoading();
        }
    };

    return {
        // Campos
        identifier, setIdentifier,
        tempPassword, setTempPassword,
        newPassword, setNewPassword,
        newPasswordConfirmation, setNewPasswordConfirmation,

        // Mensagens
        message, type,

        // Função de envio
        handleFirstAccess,
    };
}
