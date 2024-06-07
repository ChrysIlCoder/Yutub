import express from 'express';

import { videos } from "../database/database";
import { IChannel } from './channels';

const router = express.Router();

export interface IComment {
  status?: number;
  video_uuid: string;
  comment_info: {
    comment: string;
    channel: IChannel;
  }
  created_at: Date;
  id: string;
}

export interface INewComment {
  comment: string;
  channel: IChannel;
}

router.post('/comments/new', (req, res) => {
  const video_uuid: any = req.query.video_uuid;
  const comment: INewComment = req.body

  const response: IComment = {
    status: res.statusCode,
    video_uuid: video_uuid,
    comment_info: {
      comment: comment.comment,
      channel: comment.channel
    },
    created_at: new Date(),
    id: video_uuid + '-' + Math.floor(Math.random() * 9E9).toString()
  }

  videos.map(video => {
    if (video.uuid === video_uuid) video.comments.push(response);
  });
  res.json(response);
});

router.get('/comments/of', (req, res) => {
  const video_uuid: any = req.query.video_uuid;

  const video = videos.find(video => video.uuid === video_uuid);
  res.json({
    status: res.statusCode,
    comments: video?.comments
  });
})

router.put('/comments/edit', (req, res) => {
  const { edited_comment } = req.body
  const comment_id = req.query.comment_id;

  const video = videos.find(video => video.comments)
  const comment = video?.comments.find(comment => comment.id === comment_id)

  //@ts-ignore
  comment.comment_info.comment = edited_comment
  
  if (res.statusCode === 200) {
    res.json({
      status: 204,
      message: `Edited comment of id: ${comment_id}`
    })
  } else {
    res.json({
      status: 500,
      message: `Internal server error`
    })
  }
});

router.delete('/comments/delete', (req, res) => {
  const comment_id = req.query.comment_id;

  const video = videos.find(video => video.comments)
  
  const index = video?.comments.findIndex(comment => comment.id === comment_id);
  //@ts-ignore
  if (index > -1) {
    //@ts-ignore
    video?.comments.splice(index, 1);
  }

  console.log(index)
  
  res.send({
    status: res.statusCode,
    message: `Comment deleted with id of: ${comment_id}`
  });
});

export { router };
