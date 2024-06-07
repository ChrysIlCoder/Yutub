import { IChannel } from './Channels';
import { IComment } from './Comments';

export type IVideos = {
  status: number;
  videos: IVideo[];
}

export interface IVideo {
  status?: number;
  video_info: IVideoInfo;
  uuid: string;
  channel: IChannel;
  created_at: string;
  comments: IComment[];
  views: number;
}

export interface IVideoInfo {
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
}

export interface IVideoPost {
  title: string;
  description: string;
  thumbnail_file: File;
  video_file: File;
  channel: IChannel;
}