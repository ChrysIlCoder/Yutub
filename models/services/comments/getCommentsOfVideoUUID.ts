import { fetcher } from '../../../hooks/fetcher'

export const GetCommentsOfVideoUUID = async (url: string, uuid: string): Promise<any> => fetcher({ method: 'get', url: `${url}?video_uuid=${uuid}` })