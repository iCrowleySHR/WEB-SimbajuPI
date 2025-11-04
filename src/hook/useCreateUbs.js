import { useState } from "react";
import { createUbs } from "../api/routers/user";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useCreateUbs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async () => {
    if (!fullName || !email) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }

    showLoading();
    setMessage(null);

    try {
      await createUbs({ name: fullName, email });
      setMessage({ type: "success", text: "Conta de UBS cadastrada com sucesso!" });

      setFullName("");
      setEmail("");
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    } finally {
      hideLoading();
    }
  };

  return {
    fullName, setFullName,
    email, setEmail,
    message,
    handleSubmit,
  };
}
