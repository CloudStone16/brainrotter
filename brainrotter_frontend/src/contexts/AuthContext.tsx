import { createContext, useContext, useState } from "react";

interface AuthType {
  user: any | null;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("brainrot_token"));
  const [user, setUser] = useState(
    localStorage.getItem("brainrot_user")
      ? JSON.parse(localStorage.getItem("brainrot_user")!)
      : null
  );

  const login = (token: string, user: any) => {
    localStorage.setItem("brainrot_token", token);
    localStorage.setItem("brainrot_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("brainrot_token");
    localStorage.removeItem("brainrot_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
