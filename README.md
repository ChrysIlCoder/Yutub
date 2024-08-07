# Yutub (Youtube Copy)
Yutub it's a similar copy of [Youtube](https://youtube.com), with uploads, views, channels ect. It was made to understand more of [ExpressJS](http://expressjs.com/) and backend in general.
> Note: Not all of the API calls are actually used in the project because... Uh... Yeah i just got bored of the project, my bad. 😐

## How to start
### Front-end
- To start the front-end server just type `npm run dev` in the root folder
### Back-end
- To start the back-end server you have to first edit the IP address with yours in the `index.ts` and all the other places were the ip is needed
- then you can type `npm run server` in the `index.ts` root folder

## API Endpoints

>  Videos endpoint
  - ```/videos/all```: Returns all the videos from the database as an array of objects
  - ```/videos/post```: Creates an object of IVideo and adds its to the database
  - ```/videos/add/views```: Adds a view to the video with that id
  - ```/videos/video```: Returns the video object with that id
>  Channels endpoint
  - ```/channel/:id```: Returns the channel object with that id
  - ```/channel/subscribe```: Subscribes to the channel with that id
  - ```/channel/unsubscribe```: Unsubscribes to the channel with that id
  - ```/channel/edit/name```: Edits the name of the channel with that id
  - ```/channel/edit/banner```: Edits the banner to the channel with that id
  - ```/channel/edit/profile_pic```: Edits the profile picture to the channel with that id
>  Accounts endpoint
  - ```/accounts/login```: Logins the user through is account and the subsequent channel with his email and password
  - ```/accounts/account/create```: Creates an object of IAccount and adds its to the database
  - ```/accounts/:id/subscriptions```: Returns all the accounts channel subscribtions with an array
>  Comments endpoint
  - ```/comments/of```: Returns an array of all the comments of a video with that id
  - ```/comments/new```: Adds a new comment to the video with that id
  - ```/comments/edit```: Edits the comment object with a new comment with that id
  - ```/comments/delete```: Deletes the comment object with that id
