import {useCallback, useEffect, useState} from "react";
import {pipe} from "fp-ts/function";
import {match} from "fp-ts/TaskEither";
import {User} from "../../domain/models/user";
import {createAuthUseCase} from "../../service-locator";
import {AuthStore} from "../../domain/models/auth-store";


export const useAuthProcess = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isAuthenticated, setAuthenticated] = useState<Boolean>(false);

    useEffect(() => {
        if (typeof user !== "undefined")
            setAuthenticated(true)
        else
            setAuthenticated(false)
    }, [user])

    const logout = useCallback(() => {
        setUser(undefined)
    }, [setUser])


    const initialAuthStore: AuthStore = {
        user, isAuthenticated ,
        login: async exchange => {
            await pipe(
                createAuthUseCase(exchange),
                match(
                    err => {
                        console.error(err)
                        setUser(undefined)
                    },
                    u => setUser(u)
                )
            )()
        },
        logout,
    }

    return {
        initial: initialAuthStore
    }
}