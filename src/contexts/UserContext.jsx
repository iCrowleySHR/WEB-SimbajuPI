import { createContext, useContext, useState, useEffect } from "react";
import { getMyData } from "../api/routers/user";
import { useLoading } from "./LoadingContext";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = async () => {
    showLoading();
    const token = localStorage.getItem("token");
    if (!token) {
      hideLoading();
      navigate("/login");
      return;
    }

    try {
      const response = await getMyData();
      if (response.data?.message === "unauthenticated") {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
        return;
      }
      setUser(response.data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUserContext: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
