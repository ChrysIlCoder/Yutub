import { useEffect } from 'react'
import './ChannelVideos.scss'
import { useDispatch, useSelector } from 'react-redux'
import { videosSagaActions, videosSelector } from '../../../redux/saga/videos/slice/videosSlice'
import VideoCard from '../../VideoCard/VideoCard'
import { format } from 'date-fns'
import { channelsSelectors } from '../../../redux/saga/channels/slice/channelsSlice'

export default function ChannelVideos() {
  const channel_info = useSelector(channelsSelectors.getChannelByIdInfo)
  const videos = useSelector(videosSelector.getVideosList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(videosSagaActions.sagaGetVideos())
  }, [])

  return (
    <div className='channel_videos_grid_container' style={videos?.videos?.length >= 3 ? {justifyItems: 'center'} : {justifyItems: 'left'}}>
      {videos?.videos?.map((video, index) => {
        if (!videos?.videos?.some(video => video.channel?.id === channel_info?.id)) {
          return <h2 key={index}>This channel has no videos</h2>;
        }        

        if (video?.channel?.id === channel_info?.id) {
          return (
            <VideoCard 
              {...video}
              created_at={format(new Date(video?.created_at), "dd/MM/yyyy")}
              small
              no_channel
              key={index}
            />
          )
        } else {
          return null
        }
      })}
    </div>
  )
}
