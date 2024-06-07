import { useEffect } from 'react'
import PageLayout from '../components/Layouts/PageLayout/PageLayout'
import VideoCard from '../components/VideoCard/VideoCard'
import HomeVideosContainer from '../components/Layouts/HomeVideosLayout/HomeVideosContainer'
import { useDispatch, useSelector } from 'react-redux'
import { videosSelector, videosSagaActions } from '../redux/saga/videos/slice/videosSlice'
import { format } from 'date-fns'
import { navbarActions } from '../redux/features/navbar'

export default function Home() {
  const dispatch = useDispatch()
  const videos = useSelector(videosSelector.getVideosList)

  useEffect(() => {
    dispatch(videosSagaActions.sagaGetVideos())
    dispatch(navbarActions.setOpenSidebar(true))
    document.title = "Yutub"
  }, [])

  return (
    <PageLayout>
      <HomeVideosContainer>
        {videos?.videos?.length !== 0 ? videos.videos?.map((video) => (
          <VideoCard
            {...video}
            created_at={format(new Date(video?.created_at), "dd/MM/yyyy")}
            key={video?.uuid}
          />
        )) : <h1>No videos found</h1>}
      </HomeVideosContainer>
    </PageLayout>
  );
}
