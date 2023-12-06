import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState('auth', {});

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);

        navigate("/");
    };

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password, values.username);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate("/");
    };

    const logoutHandler = async () => {
        await authService.logout()
        setAuth({});
        localStorage.removeItem('accessToken');

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
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;