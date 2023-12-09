import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState("auth", {});

  const loginSubmitHandler = async (values) => {
    try {
      const result = await authService.login(values.email, values.password);
      setAuth(result);
    //   console.log(result);
      localStorage.setItem("accessToken", result.accessToken);

      navigate("/");
    } catch (error) {
    //   console.log(error);
      setAuth({error: error})
    }
  };

  const registerSubmitHandler = async (values) => {
    try {
      const result = await authService.register(
        values.email,
        values.password,
        values.username
      );
  
      setAuth(result);
  
      localStorage.setItem("accessToken", result.accessToken);
  
      navigate("/");
      
    } catch (error) {
      setAuth({error: error})
    }
  };

  const logoutHandler = async () => {
    await authService.logout();
    setAuth({});
    localStorage.removeItem("accessToken");

    navigate("/");
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username || auth.email || "Guest",
    email: auth.email,
    userId: auth._id,
    isAuthenticated: !!auth.accessToken,
    errors: auth.error
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
