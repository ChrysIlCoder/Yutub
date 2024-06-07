export interface IChannel {
  id: string;
  name: string;
  description: string;
  subscribers_count: number;
  channel_banner: string;
  channel_profile_pic: string;
}

export interface ISubscribeToChannel {
  account_id: string;
  channel_id: string;
}

export interface IDefaultServerMessage {
  status: number;
  message: string;
}

export interface IModifyChannelInfo {
  new_text?: string;
  new_banner?: File;
  new_profile_pic?: File;
}