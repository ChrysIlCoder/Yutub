import { useDispatch, useSelector } from 'react-redux'
import VideoCardHorizontal from '../VideoCardHorizontal/VideoCardHorizontal'
import { videosSagaActions, videosSelector } from '../../redux/saga/videos/slice/videosSlice'

import './VideosVerticalList.scss'
import { format } from 'date-fns'
import { useEffect } from 'react'

export default function VideosVerticalList() {
  const videos = useSelector(videosSelector.getVideosList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(videosSagaActions.sagaGetVideos())
  }, [])

  return (
    <div className='videos_vertical_list_container'>
      {videos?.videos?.map((video) => (
        <VideoCardHorizontal
          {...video}
          created_at={format(new Date(video?.created_at), "dd/MM/yyyy")}
          key={video?.uuid}
        />
      ))}
    </div>
  )
}