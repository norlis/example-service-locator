export enum ErrorKind {
    UNEXPECTED_ERROR = 'UnexpectedError',
    API_FAILURE = 'ApiFailure',
    UNAUTHORIZED = 'Unauthorized'
}

type BaseError = {
    kind: ErrorKind;
    error?: Error;
    message?: string;
    code?: number
    statusCode?: number | string | null;
}

export type ApiError = BaseError & {
    kind: ErrorKind.API_FAILURE;
    statusCode: number;
    message: string;
}

export type UnexpectedError = BaseError & {
    kind: ErrorKind.UNEXPECTED_ERROR;
    error: Error;
}

export type Unauthorized = BaseError & {
    kind: ErrorKind.UNAUTHORIZED;
    message: string;
}

export type DataError = ApiError | UnexpectedError | Unauthorized