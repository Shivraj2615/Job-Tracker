import { createContext, useEffect, useState } from "react";
import { setToken, removeToken, getToken } from "../utils/token";
import { api, getAuthHeaders } from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await api.get("/auth/me", { headers: getAuthHeaders() });
        setUser(res.data);
      } catch (error) {
        removeToken();
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
