import {DataError, ErrorKind} from "../models/error-kind";

export type ErrorsMappings = {
    [name in ErrorKind]: ErrorMapping | undefined;
}

export type ErrorMapping = {
    defaultMessage?: string
}

export const errorMappings: ErrorsMappings = {
    [ErrorKind.UNEXPECTED_ERROR]: {
        defaultMessage: ""
    },
    [ErrorKind.API_FAILURE]: {
        defaultMessage: ""
    },
    [ErrorKind.UNAUTHORIZED]: {}
}

const createFailure = (errorMapping: ErrorMapping | undefined, dataError: DataError): string => {
    const message = dataError?.message || dataError?.error?.message || ""
    const defaultMessage = typeof errorMapping?.defaultMessage !== "undefined" ?  `${errorMapping?.defaultMessage}. ` : ""
    return `${defaultMessage}${message}`
}

const HandleErrorUseCase = (props: DataError): string => {
    return createFailure(errorMappings[props.kind], props)
}

export default HandleErrorUseCase