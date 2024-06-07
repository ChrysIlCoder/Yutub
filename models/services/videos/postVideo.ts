import { fetcher } from "../../../hooks/fetcher";
import { IVideoPost } from "../../Videos";

export const PostVideo = async (url: string, body: IVideoPost): Promise<any> =>
  fetcher({ 
    method: "post", 
    url, 
    body,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
