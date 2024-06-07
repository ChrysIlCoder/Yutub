import { IChannel } from "./Channels";

export interface IAccountRecived {
  status: number;
  user: IAccount & {
    channel: IChannel
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterAccount {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface IAccount {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  id: string;
  subscribed_to: string[];
  channel: IChannel;
}