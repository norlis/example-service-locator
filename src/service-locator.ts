import { ExchangeAuthIn } from "./domain/models/exchange-auth";
import { AuthUseCase } from "./domain/use-cases";
import {AuthService, ProfileService} from "./services";
import {User} from "./domain/models/user";
import {TaskEither} from "fp-ts/TaskEither";
import {DataError} from "./domain/models/error-kind";
import {GetProfileUseCase} from "./domain/use-cases/get-profile-use-case";
import {Profile} from "./domain/models/profile";


// definiciones de injecting
export let useGetProfileUseCase: {(): TaskEither<DataError, Profile>}
export let createAuthUseCase: {(props: ExchangeAuthIn): TaskEither<DataError, User>}


/**
 * injecting dependencies (currying)
 * @param props
 */
export function bootstrap(){
    useGetProfileUseCase = GetProfileUseCase(ProfileService)
    createAuthUseCase = AuthUseCase({ authRepository: AuthService })
}

// initialize Service Locator
bootstrap()