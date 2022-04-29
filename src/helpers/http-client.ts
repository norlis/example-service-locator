// import {Agent as SecureAgent} from 'https'
// import {Agent as Agent} from 'https'
import {pipe} from 'fp-ts/function'
import {TaskEither, tryCatch, map} from 'fp-ts/TaskEither'
import axios, { Method , AxiosResponse, AxiosRequestConfig } from 'axios'
import { ApiError, DataError, ErrorKind } from '../domain/models/error-kind'


type Options = {
    method: string
    payload?: any
    headers?: { [key: string]: string | undefined }
}

export default <T>(endpoint: string, props: Options): TaskEither<DataError, T> => {

    const {protocol, host, pathname, search} = new URL(endpoint)
    
    const isSecure = protocol === "https:"
    const [, s=""] = search.split("?")
    const params = Object.assign({}, ...s.split("&").map(i => {
        const [k, v] = i.split('=')
        return v && {[k]: v}
    }))

    const axiosProps: AxiosRequestConfig = {
        url: `${pathname}`,
        baseURL: `${protocol}//${host}/`,
        method: props.method as Method,
        headers: Object.assign( {
             "Content-Type": "application/json",
             // "Access-Control-Allow-Origin": "'*'"
            }, 
            ...Object
                .entries(props.headers || {})
                .filter(([,v]) => typeof v === "string")
                .map(([k,v]) => ({[k]: v}))
        ),
        data: props.payload,
        params,
        // httpsAgent: isSecure ? new SecureAgent({ rejectUnauthorized: false }) : undefined,
        // httpAgent: !isSecure ? new Agent({ rejectUnauthorized: false }) : undefined,
    }

    return pipe(
        tryCatch(
            () => axios.request<T, AxiosResponse>(axiosProps),
            // toError
            reason => {
                const err: any = reason
                const status = err?.response?.status || 500
                const defaultMessage = reason instanceof Error ? reason.message : String(reason)
                
                const bodyMessage = err?.response?.data?.detail || undefined
                const message = typeof bodyMessage !== "undefined" ? bodyMessage : defaultMessage

                return {
                    statusCode: status,
                    message,
                    kind: ErrorKind.API_FAILURE,
                    error: reason
                } as ApiError
            }
        ),
        map( res => res.data)
    )

} 
 