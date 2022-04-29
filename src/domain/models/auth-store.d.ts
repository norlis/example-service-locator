import {User} from "./user";
import {ExchangeAuthIn} from "./exchange-auth";


export type AuthStore = {
    user?: User
    isAuthenticated: Boolean
    login: (values: ExchangeAuthIn) => Promise<void>
    logout: () => void
    // state: State
    // actions: Actions
}