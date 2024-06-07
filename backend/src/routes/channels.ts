import express from "express";
import { accounts } from "../database/database";
import multer from "multer";
import { rewrite_url } from "../utils/functions";
import fs from 'fs'

const router = express.Router();

export interface IChannel {
  id: string;
  name: string;
  description: string;
  subscribers_count: number;
  channel_banner: string;
  channel_profile_pic: string;
}

let channel_id = ""

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = `public/channels/uploads/${channel_id}`;

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${channel_id}-${file.originalname.replace(/\s/g, '_')}`)
  }
});

const upload = multer({ storage });

const assignID = (req: any, res: any, next: any) => {
  const id = req.query.channel_id
  //@ts-ignore
  channel_id = accounts.find(account => account.channel.id === id)?.channel.id

  next()
}

// GET /channel/:id
router.get("/channel/:id", (req, res) => {
  const channel_id = req.params.id;

  const response = accounts.find(
    (account) => account.channel.id === channel_id
  );

  res.json(response?.channel);
});

router.put("/channel/subscribe", (req, res) => {
  const { account_id, channel_id } = req.body;

  const subscriber = accounts.find((account) => account.id === account_id);
  const channel = accounts.find((account) => account.channel.id === channel_id);

  //@ts-ignore
  subscriber?.subscribed_to.push(channel?.id);
  //@ts-ignore
  channel?.channel.subscribers_count += 1;

  if (res.statusCode === 200) {
    res.json({
      status: 204,
      message: `Subscribed ${account_id} to channel ${channel_id}`
    });
  } else {
    res.json({
      status: 500,
      message: `Internal server error`
    });
  }
});

router.put("/channel/unsubscribe", (req, res) => {
  const { account_id, channel_id } = req.body;

  const subscriber = accounts.find((account) => account.id === account_id);
  const channel = accounts.find((account) => account.channel.id === channel_id);

  //@ts-ignore
  const index = subscriber?.subscribed_to.indexOf(channel?.id);
  //@ts-ignore
  if (index > -1) {
    //@ts-ignore
    subscriber?.subscribed_to.splice(index, 1);
  }
  //@ts-ignore
  channel?.channel.subscribers_count -= 1;

  if (res.statusCode === 200) {
    res.json({
      status: 204,
      message: `Unsubscribed ${account_id} from channel ${channel_id}`
    });
  } else {
    res.json({
      status: 500,
      message: `Internal server error`
    });
  }
});

router.put("/channel/edit/description", (req, res) => {
  const channel_id = req.query.channel_id;

  const channel = accounts.find((account) => account.channel.id === channel_id);

  //@ts-ignore
  channel.channel.description = req.body.new_text;

  req.body.new_text !== undefined ? res.json({
    status: 204,
    message: `Channel ${channel_id} description was modified`
  }) : res.json({
    status: 500,
    message: `Text not sent`
  });
});

router.put("/channel/edit/name", (req, res) => {
  const channel_id = req.query.channel_id;

  const channel = accounts.find((account) => account.channel.id === channel_id);

  //@ts-ignore
  channel?.channel.name = req.body.new_text;

  req.body.new_text !== undefined ? res.json({
    status: 204,
    message: `Channel ${channel_id} description was modified`
  }) : res.json({
    status: 500,
    message: `Text not sent`
  });
});

router.put("/channel/edit/banner", assignID, upload.single("new_banner"), (req, res) => {
  const channel_id = req.query.channel_id;

  const channel = accounts.find((account) => account.channel.id === channel_id);

  //@ts-ignore
  channel?.channel.channel_banner = rewrite_url(req.file?.path,"channels",channel_id);

  res.json({
    status: 204,
    message: `Channel ${channel_id} banner was modified`
  })
});

router.put("/channel/edit/profile_pic", assignID, upload.single("new_profile_pic"), (req, res) => {
  const channel_id = req.query.channel_id;

  const channel = accounts.find((account) => account.channel.id === channel_id);

  //@ts-ignore
  channel?.channel.channel_profile_pic = rewrite_url(req.file?.path,"channels",channel_id);

  res.json({
    status: 204,
    message: `Channel ${channel_id} profile pic was modified`
  })
});

export { router };
