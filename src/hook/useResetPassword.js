import { useState, useEffect } from "react";
import { resetPassword } from "../api/routers/auth";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { useSearchParams } from "react-router-dom";

export function useResetPassword() {
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    const urlToken = searchParams.get("token");

    if (urlEmail) setEmail(urlEmail);
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleSubmit = async () => {
    if (!email || !token || !password || !passwordConfirmation) {
      setMessage({
        type: "error",
        text: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    if (password !== passwordConfirmation) {
      setMessage({
        type: "error",
        text: "As senhas não coincidem.",
      });
      return;
    }

    showLoading();
    setMessage(null);

    try {
      await resetPassword({
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setMessage({
        type: "success",
        text: "Senha redefinida com sucesso! Agora você pode fazer login.",
      });

      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    } finally {
      hideLoading();
    }
  };

  return {
    email,
    setEmail,
    token,
    setToken,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    message,
    handleSubmit,
  };
}