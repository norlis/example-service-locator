import {Profile} from "./models/profile";
import {TaskEither} from "fp-ts/TaskEither";
import {DataError} from "./models/error-kind";


export type ProfileRepository = {
      (): TaskEither<DataError, Profile>
}