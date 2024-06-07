import {fetcher} from '../../../hooks/fetcher'

export const GetVideoByUUID = async (url: string, uuid: string): Promise<any> => fetcher({ method: 'get', url: `${url}?uuid=${uuid}` })