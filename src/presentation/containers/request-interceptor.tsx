import React, {useEffect} from 'react';
import axios from 'axios';
import {useAuth} from "../hooks/use-auth";


interface RequestInterceptorProps {
    children: JSX.Element,
}

const RequestInterceptor: React.FC<RequestInterceptorProps> = ({children}: RequestInterceptorProps) => {
    const {user} = useAuth()

    useEffect(() => {
        /* eslint-disable no-param-reassign */
        if (user) {
            axios.interceptors.request.use(async config => {
                // TODO si no existe redirigir a crea un token

                const bearer = `Bearer ${user?.accessToken}`;
                if (typeof config.headers !== "undefined")
                    config.headers.Authorization = bearer;

                console.log('config', config)
                return config;
            });
        }

        /* eslint-enable no-param-reassign */
    }, [user])


    return (
        <>
            {children}
        </>
    );
};

export default RequestInterceptor;