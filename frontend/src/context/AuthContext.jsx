import { createContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
} from "../Instance/API";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      await refreshUser();
      setLoading(false);
    };

    bootstrap();
  }, []);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await registerRequest(payload);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
