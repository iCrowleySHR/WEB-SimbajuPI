import { createContext, useContext, useState, useEffect } from "react";
import { getMyData } from "../api/routers/user";
import { useLoading } from "./LoadingContext";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      hideLoading();
      return;
    }

    showLoading();
    try {
      const response = await getMyData();
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    } finally {
      hideLoading();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUserContext: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
