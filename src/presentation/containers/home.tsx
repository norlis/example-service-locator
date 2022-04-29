import React from "react";
import {useAuth} from "../hooks/use-auth";
import {useProfile} from "../hooks/useProfile";

const HomePage: React.FC = () => {
    const {user: {email = ""} = {}} = useAuth()
    const {query: {data}} = useProfile()

    return <>
        <p>
            hola: <strong>{email}</strong>
        </p>

        <pre>
                {JSON.stringify(data, null, 2)}
        </pre>
    </>
}

export default HomePage