import { useState, useEffect } from "react";
import { getUserById } from "../api/routers/user";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useUserDetails(userId) {
  const { showLoading, hideLoading } = useLoading();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchUser = async (id) => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getUserById(id);

      if (!response) {
        setMessage("Usuário não encontrado.");
        setUser(null);
        return;
      }

      setUser(response);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return {
    user,
    error,
    message,
    refetch: () => fetchUser(userId),
  };
}