import { createContext, useContext, useState, useEffect } from "react";
import { getMyData } from "../api/routers/user"; 

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await getMyData(); 
      setUser(response.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Atualiza o usuário (login, logout ou update)
  const updateUserContext = (newUser) => setUser(newUser);

  return (
    <UserContext.Provider value={{ user, loading, updateUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
