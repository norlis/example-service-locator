import {useGetProfileUseCase} from "../../service-locator";
import {useQuery} from "react-query";
import {pipe} from "fp-ts/function";
import {getOrElse} from "fp-ts/TaskEither";


export const useProfile = () => {
    const query = useQuery('profile',
        pipe(
            useGetProfileUseCase(),
            getOrElse(err => {throw new Error(err.message)})
        )
    )
    return {query}
}