import { IChannel } from "./Channels";

export interface IComments {
  status: number;
  comments: IComment[];
}

export interface INewComment {
  comment: string;
  channel: IChannel;
  video_uuid: string;
}

export interface IComment {
  status?: number;
  video_uuid: string;
  comment_info: {
    comment: string;
    channel: IChannel;
  }
  created_at: string;
  id: string;
}

export interface IEditComment {
  id: string;
  edited_comment: string;
}

export interface IEditedComment {
  status: number;
  message: string;
}

export interface IDeletedComment {
  status: number;
  message: string;
}