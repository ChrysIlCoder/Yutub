import {fetcher} from '../../../hooks/fetcher'

export const GetVideos = async (url: string): Promise<any> => fetcher({ method: 'get', url })