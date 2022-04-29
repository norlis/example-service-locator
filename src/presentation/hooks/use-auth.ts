import {AuthStore} from "../../domain/models/auth-store";
import {createContext} from "../helpers/createContext";


export const [AuthContext, useAuth] = createContext<AuthStore>()