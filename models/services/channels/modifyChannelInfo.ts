import { fetcher } from "../../../hooks/fetcher";
import { IModifyChannelInfo } from "../../Channels";

export const ModifyChannelInfo = async (
  url: string,
  body: IModifyChannelInfo
): Promise<any> => 
  fetcher({
    method: "put",
    body,
    url,
    headers: body.new_text ? {
      "Content-Type": "multipart/form-data"
    } : {}
  });