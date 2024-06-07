import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'

import { router as video_routers } from './routes/videos'
import { router as account_routers } from './routes/accounts'
import { router as comments_routers } from './routes/comments'
import { router as channels_routers } from './routes/channels'

const app = express()
app.use(cors())
app.use(session({
  secret: 'yutub_secret007',
  resave: false,
  saveUninitialized: false,
}))

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(video_routers)
app.use(account_routers)
app.use(comments_routers)
app.use(channels_routers)

export const port = 3000
export const ip = '[your-ip]'
app.listen(port, ip, () => console.log(`Server up and running on: http://${ip}:${port}`))