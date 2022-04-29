import {ProfileRepository} from "../profile-repository";
import {map, TaskEither, tryCatch} from "fp-ts/TaskEither";
import {DataError, ErrorKind} from "../models/error-kind";
import {Profile} from "../models/profile";
import {pipe} from "fp-ts/function";


export const GetProfileUseCase = (repository: ProfileRepository) => (): TaskEither<DataError, Profile> => {
    return pipe(
        repository(),
        // map(res => res)
    )
}