import { fetcher } from "../../../hooks/fetcher";

export const PutVideosViews = async (url: string, uuid: string): Promise<any> => fetcher({ method: "put", url: `${url}?video_uuid=${uuid}` });