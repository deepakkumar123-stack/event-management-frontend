import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
interface AuthContextType {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  _logout: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}
export const _getAuthToken = () => localStorage.getItem("token") || undefined;
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | undefined>(_getAuthToken);
  const navigate = useNavigate();
  const _logout = () => {
    setToken(undefined);
    localStorage.removeItem("token");
    navigate("/event");
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token") || undefined;
      setToken(updatedToken);
      if (!updatedToken) {
        navigate("/event");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <AuthContext.Provider value={{ token, setToken, _logout }}>
      {children}
    </AuthContext.Provider>
  );
};
