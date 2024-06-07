import { fetcher } from '../../../hooks/fetcher'

export const GetChannelById = async (url: string, id: string): Promise<any> => fetcher({ method: 'get', url: `${url}/${id}` })