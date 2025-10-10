import { useState } from "react";
import { updateUser } from '../api/routers/user';
import getErrorMessage from "../utils/getErrorMessage";
import { useLoading } from "../contexts/LoadingContext";

export function useUserSettings(initialEmail = "") {
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [messageEmail, setMessageEmail] = useState(null);
  const [messagePassword, setMessagePassword] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const handleEmailUpdate = async () => {
    if (!email) {
      setMessageEmail({ type: "error", text: "Email é obrigatório." });
      return;
    }

    try {
      showLoading();
      const response = await updateUser({ email });
      setMessageEmail({ type: "success", text: response.message });
      hideLoading();
    } catch (error) {
      setMessageEmail(getErrorMessage(error));
      hideLoading();
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !password || !passwordConfirmation) {
      setMessagePassword({ type: "error", text: "Todos os campos de senha são obrigatórios." });
      return;
    }

    try {
      showLoading();
      const response = await updateUser({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessagePassword({ type: "success", text: response.message });
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
      hideLoading();
    } catch (error) {
      setMessagePassword(getErrorMessage(error));
      hideLoading();
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
