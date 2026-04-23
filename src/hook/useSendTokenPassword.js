import { useState } from "react";
import { sendTokenPassword } from "../api/routers/auth";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useSendTokenPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Por favor, informe seu e-mail." });
      return;
    }

    showLoading();
    setMessage(null);

    try {
      await sendTokenPassword({ email });

      setMessage({
        type: "success",
        text: "Token enviado com sucesso! Verifique seu e-mail.",
      });

      setEmail("");
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    } finally {
      hideLoading();
    }
  };

  return {
    email,
    setEmail,
    message,
    handleSubmit,
  };
}