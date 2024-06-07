import { fetcher } from '../../../hooks/fetcher'
import { ISubscribeToChannel } from '../../Channels'

export const SubscribeToChannel = async (url: string, body: ISubscribeToChannel): Promise<any> => fetcher({ method: 'put', body, url })