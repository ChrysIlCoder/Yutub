import express from "express";
import multer from "multer";
import fs from "fs";

import { randomUUID } from "crypto";

import { videos } from "../database/database";

import { IComment } from "./comments";
import { rewrite_url } from "../utils/functions";
import { IChannel } from "./channels";

const router = express.Router();

export interface IPostNewVideoProps {
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
}

export interface IVideo {
  status?: number;
  video_info: IPostNewVideoProps;
  uuid: string;
  channel: IChannel;
  created_at: Date;
  comments: IComment[];
  views: number;
}

let video_uuid: string = ""

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = `public/videos/uploads/${video_uuid}`;

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder)
  },
  filename: (req, file, cb) => {
    cb(null, `${video_uuid}-${file.originalname.replace(/\s/g, '_')}`)
  }
})

const upload = multer({ storage })

const assignUuid = (req: any, res: any, next: any) => {
  video_uuid = randomUUID()
  next()
}

router.get("/videos/all", (req, res) => {
  res.json({
    status: res.statusCode,
    videos: videos
  });
});

router.post("/videos/post", assignUuid, upload.fields([{name: 'thumbnail_file'}, {name: 'video_file'}]), (req, res) => {
  const { title, description, channel } = req.body;
  const { thumbnail_file, video_file } = req.files as { thumbnail_file: Express.Multer.File[], video_file: Express.Multer.File[] };

  const response: IVideo = {
    status: res.statusCode,
    video_info: {
      title,
      description,
      thumbnail_url: rewrite_url(thumbnail_file[0].path, "videos", video_uuid),
      video_url: rewrite_url(video_file[0].path, "videos", video_uuid),
    },
    uuid: video_uuid,
    channel: JSON.parse(channel),
    created_at: new Date(),
    comments: [],
    views: 0
  };

  videos.push(response);
  res.json(response);
});

router.put("/videos/add/views", (req, res) => {
  const uuid = req.query.video_uuid;

  const video = videos.find((video) => video.uuid === uuid);
  if (video) {
    video.views += 1;
    res.json({
      status: res.statusCode,
      message: `Added 1 view to video with uuid: ${uuid}`
    });
  } else {
    res.json({
      status: 404,
      message: `Video with uuid: ${uuid} not found`
    });
  }
})

router.get("/videos/video", (req, res) => {
  const uuid = req.query.uuid;

  const video = videos.find(video => video.uuid === uuid)

  res.json(video);
});

router.delete("/videos/delete/:uuid", (req, res) => {
  const uuid: string = req.params.uuid;
  res.json({
    status: res.statusCode,
    message: `Deleted video with the uuid of: ${uuid}`
  });
});

export { router };

