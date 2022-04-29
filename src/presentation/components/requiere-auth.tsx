import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/use-auth";

const RequireAuth: React.FC<{children: JSX.Element}> = ({children}) => {
    const { isAuthenticated } = useAuth()
    if( isAuthenticated )
        return children
    return <Navigate to="/login" replace />
}

export default RequireAuth