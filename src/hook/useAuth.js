import { login as loginApi, logout as logoutApi } from "../api/routers/auth";
import { useUser } from "../contexts/UserContext";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export const useAuth = () => {
  const { updateUserContext } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const login = async (credentials) => {
    showLoading();
    try {
      const { data, token } = await loginApi(credentials);
      localStorage.setItem("token", token);
      updateUserContext(data);
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    } finally {
      hideLoading();
    }
  };

  const logout = async () => {
    showLoading();
    try {
      await logoutApi();
    } finally {
      localStorage.removeItem("token");
      updateUserContext(null);
      hideLoading();
    }
  };

  return { login, logout };
};
