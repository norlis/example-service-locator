import React, {useEffect} from "react";
import {useAuth} from "../hooks/use-auth";
import {useNavigate} from "react-router-dom";


const LoginPage: React.FC = () => {
    // use
    const navigate = useNavigate()
    const { login, isAuthenticated } = useAuth()

    useEffect(() => {
        if(isAuthenticated) navigate('/', { replace: true });
    }, [isAuthenticated, navigate])

    return <>
        <h1> login </h1>

        <p>
            <button onClick={() => {
                login({
                    username: "admin@noexiste.com",
                    password: "unPassReSeguro",
                    provider: "test"
                })
            }}>click para iniciar sesion</button>
        </p>
    </>
}

export default LoginPage