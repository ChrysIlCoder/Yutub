import express from "express";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { accounts } from "../database/database";
import { IChannel } from "./channels";

const router = express.Router();

export interface ICreateNewAccount {
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

router.post("/accounts/login", async (req, res) => {
  const body: ILogin = req.body;

  for (let account in accounts) {
    if (accounts[account].email === body.email) {
      const valid = await bcrypt.compare(
        body.password,
        accounts[account].password
      );
      if (valid) {
        res.json({
          status: 200,
          user: accounts[account],
        });
      }
    }
  }
});

router.post("/accounts/account/create", async (req, res) => {
  try {
    const body: IRegisterAccount = req.body;
    const hashed_password = await bcrypt.hash(body.password, 10);

    const id = randomUUID()

    const response: ICreateNewAccount = {
      status: res.statusCode,
      user: {
        ...body,
        id: id,
        password: hashed_password,
        channel: {
          id: id,
          name: body.username,
          description: `This is ${body.username}'s channel`,
          subscribers_count: 0,
          channel_banner: 'http://172.30.112.1:3000/assets/default_files/banner_default.svg',
          channel_profile_pic: 'http://172.30.112.1:3000/assets/default_files/profile_pic_default.svg',
        },
        subscribed_to: []
      }
    };

    accounts.push(response.user);
    res.json(response);
  } catch {
    const response = {
      status: req.statusCode,
      message: "Could not register account"
    };

    res.status(500).json(response);
  }
});

router.get("/accounts/:id/subscriptions", (req, res) => {
  const id = req.params.id;

  const account = accounts.find(account => account.id === id);
  const subscribedChannels: IChannel[] = [];

  account?.subscribed_to.forEach(id => {
    const channel = accounts.find(account => account.channel.id === id);
    if (channel) {
      subscribedChannels.push(channel.channel);
    }
  });

  res.json(subscribedChannels);
})

export { router }
