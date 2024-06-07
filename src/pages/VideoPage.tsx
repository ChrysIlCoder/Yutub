import { useEffect, useState } from "react";
import PageLayout from "../components/Layouts/PageLayout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../redux/features/navbar";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import VideoPageLayout from "../components/Layouts/VideoPageLayout/VideoPageLayout";
import VideosVerticalList from "../components/VideosVerticalList/VideosVerticalList";
import VideoChannelBanner from "../components/VideoChannelBanner/VideoChannelBanner";
import CommentsSection from "../components/CommentsSection/CommentsSection";
import { videosSagaActions, videosSelector } from "../redux/saga/videos/slice/videosSlice";
import { useParams } from "react-router-dom";

export default function VideoPage() {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const { uuid } = useParams()
  
  const video_info = useSelector(videosSelector.getVideoInfo)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(videosSagaActions.sagaGetVideoByUUID(uuid))
    dispatch(navbarActions.setOpenSidebar(false));
    dispatch(videosSagaActions.sagaPutVideosViews(video_info?.uuid))
    
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [uuid]);

  useEffect(() => {document.title = `${video_info?.video_info?.title} - ${video_info?.channel?.name}`}, [video_info])

  return width >= 1024 ? (
    <PageLayout>
      <VideoPageLayout>
        <VideoPlayer />
        <VideosVerticalList />
        <VideoChannelBanner />
        <CommentsSection />
      </VideoPageLayout>
    </PageLayout>
  ) : (
    <PageLayout>
      <VideoPageLayout>
        <VideoPlayer />
        <VideoChannelBanner />
        <CommentsSection />
        <VideosVerticalList />
      </VideoPageLayout>
    </PageLayout>
  );
}
