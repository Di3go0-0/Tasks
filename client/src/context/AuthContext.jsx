import { createContext, useState, useContext, useEffect } from "react";
import {
  RegisterRequest,
  LoginRequest,
  LogoutRequest,
  verifyTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const signup = async (user) => {
    try {
      const res = await RegisterRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (e) {
      if (Array.isArray(e.response.data)) {
        console.log(e.response.data);
        return setErrors(e.response.data);
      }
      setErrors([e.response.data.message]);
      console.log(e.response.data.message);
    }
  };
  const singIn = async (user) => {
    try {
      const res = await LoginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (e) {
      if (Array.isArray(e.response.data)) {
        console.log(e.response.data);
        return setErrors(e.response.data);
      }
      setErrors([e.response.data.message]);
      console.log(e.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    LogoutRequest();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() =>{
    const cookies = Cookies.get();
    if (!cookies.token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
  })

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        singIn,
        logout,
        loading,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
