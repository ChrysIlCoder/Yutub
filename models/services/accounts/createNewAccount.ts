import { fetcher } from '../../../hooks/fetcher'
import { ICreateNewAccount } from '../../Accounts'

export const CreateNewAccount = async (url: string, body: ICreateNewAccount): Promise<any> => fetcher({ method: 'post', body, url })