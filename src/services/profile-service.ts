import {ProfileRepository} from "../domain/profile-repository";
import {MARKETPLACE_BASE_URL} from "../config";
import httpClient from "../helpers/http-client"
import {pipe} from "fp-ts/function";
import {map} from "fp-ts/es6/TaskEither";


type Response = {
    email: string
    is_company: boolean
    first_name: string
    last_name: string
    company_name: string
    tax_id: string
}

export const ProfileService: ProfileRepository = () => {
    return pipe(
        httpClient<Response>(`${MARKETPLACE_BASE_URL}/dashboard/api/user-settings`, {
            method: "GET"
        }),
        map(item => ({
            email: item.email,
            isCompany: item.is_company,
            firstName: item.first_name,
            lastName: item.last_name,
            companyName: item.company_name,
            taxId: item.tax_id,
        }))
    )
}