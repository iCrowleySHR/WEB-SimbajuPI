import { useState } from "react";
import { updateUser } from '../api/routers/user';

export function useUserSettings(initialEmail = "") {
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [messageEmail, setMessageEmail] = useState(null);
  const [messagePassword, setMessagePassword] = useState(null);

  const handleEmailUpdate = async () => {
    if (!email) {
      setMessageEmail({ type: "error", text: "Email é obrigatório." });
      return;
    }

    try {
      const response = await updateUser({ email });
      setMessageEmail({ type: "success", text: response.message });
    } catch (error) {
      setMessageEmail({ type: "error", text: error.response?.data?.message || "Erro ao atualizar email." });
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !password || !passwordConfirmation) {
      setMessagePassword({ type: "error", text: "Todos os campos de senha são obrigatórios." });
      return;
    }

    try {
      const response = await updateUser({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessagePassword({ type: "success", text: response.message });
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      setMessagePassword({ type: "error", text: error.response?.data?.message || "Erro ao atualizar senha." });
    }
  };

  return {
    email,
    setEmail,
    currentPassword,
    setCurrentPassword,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    messageEmail,
    messagePassword,
    handleEmailUpdate,
    handlePasswordUpdate
  };
}
