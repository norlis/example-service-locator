import React, {useMemo} from "react";
import {AuthContext} from '../hooks/use-auth'
import {AuthStore} from "../../domain/models/auth-store";
import {useAuthProcess} from "../hooks/use-auth-process";

const AuthProvider: React.FC<{children: JSX.Element}> = (props) => {
    const { initial } = useAuthProcess()

    const initialAuthStore: AuthStore = useMemo(() => ({
        ...initial
    }), [initial])

    return <AuthContext.Provider value={initialAuthStore} {...props} />
}

export default AuthProvider

