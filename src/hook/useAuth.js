import { login as loginApi, logout as logoutApi } from "../api/routers/auth";
import { useUser } from "../contexts/UserContext";

export const useAuth = () => {
  const { updateUserContext } = useUser();

  const login = async (credentials) => {
    const { data, token } = await loginApi(credentials);
    localStorage.setItem("token", token);      // salva token
    updateUserContext(data);                    // atualiza UserContext
    return data;
  };

  const logout = async () => {
    await logoutApi();
    localStorage.removeItem("token");
    updateUserContext(null);                   // limpa UserContext
  };

  return { login, logout };
};
