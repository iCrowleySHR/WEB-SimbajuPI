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
    showLoading();
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      hideLoading();
      return;
    }

    try {
      const response = await getMyData();
      setUser(response.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("token"); // evita loop infinito
    } finally {
      setLoading(false);
      hideLoading();
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
