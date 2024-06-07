import { fetcher } from '../../../hooks/fetcher'
import { IEditComment } from '../../Comments'

export const EditCommentById = async (url: string, body: IEditComment): Promise<any> => fetcher({ method: 'put', body, url: `${url}?comment_id=${body.id}` })