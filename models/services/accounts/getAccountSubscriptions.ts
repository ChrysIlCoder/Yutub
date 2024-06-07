import { fetcher } from '../../../hooks/fetcher'

export const GetAccountSubscriptions = async (url: string): Promise<any> => fetcher({ method: 'get', url })