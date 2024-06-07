import {fetcher} from '../../../hooks/fetcher'

export const DeleteCommentById = async (url: string, id: string): Promise<any> => fetcher({ method: 'delete', url: `${url}?comment_id=${id}` })