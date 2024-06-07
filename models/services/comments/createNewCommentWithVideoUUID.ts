import {fetcher} from '../../../hooks/fetcher'
import { INewComment } from '../../Comments'

export const CreateNewCommentWithVideoUUID = async (url: string, body: INewComment): Promise<any> => fetcher({ method: 'post', body, url: `${url}?video_uuid=${body.video_uuid}` })