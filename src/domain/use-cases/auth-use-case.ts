import jwtDecode from "jwt-decode";
import {pipe} from "fp-ts/function";
import {map, TaskEither, tryCatch} from "fp-ts/TaskEither";
import {AuthRepository} from "../auth-repository";
import {ExchangeAuthIn, ExchangeAuthOut} from "../models/exchange-auth";
import {User} from "../models/user";
import Response from "../models/response";
import {DataError, ErrorKind, Unauthorized} from "../models/error-kind";


type RepositoryProps = {
    authRepository: AuthRepository
}

const createUserFromToken = (res: Response<ExchangeAuthOut>): User => {
    const {data: {accessToken, refreshToken}} = res
    const {email} = jwtDecode<{ email: string }>(res.data.accessToken)
    return {email, accessToken: accessToken, refreshToken}
}

export const AuthUseCase = ({authRepository}: RepositoryProps) =>  (props: ExchangeAuthIn):  TaskEither<DataError, User> => {
    return pipe(
        tryCatch(
            () => authRepository({payload: props}),
            reason => ({ kind: ErrorKind.UNAUTHORIZED, message: `${reason}: bla bla` } as Unauthorized)
        ),
        map(createUserFromToken)
    )
}
