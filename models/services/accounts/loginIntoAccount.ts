import { fetcher } from "../../../hooks/fetcher" 
import { ILogin } from "../../Accounts"

export const LoginIntoAccount = async (url: string, body: ILogin): Promise<any> => fetcher({ method: 'post', body, url })