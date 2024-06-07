import { useSelector } from "react-redux";
import PageLayout from "../components/Layouts/PageLayout/PageLayout";
import { videosSelector } from "../redux/saga/videos/slice/videosSlice";
import VideoCard from "../components/VideoCard/VideoCard";
import { format } from "date-fns";
import TrendingVideosPageLayout from "../components/Layouts/TrendingVideosPageLayout/TrendingVideosPageLayout";

export default function TrendingVideosPage() {
  const videos = useSelector(videosSelector.getVideosList);
  const sortedVideos = videos?.videos.slice().sort((a, b) => b.views - a.views);

  return (
    <PageLayout>
      <TrendingVideosPageLayout>
        {sortedVideos?.map((video) => (
          <VideoCard
            {...video}
            created_at={format(new Date(video?.created_at), "dd/MM/yyyy")}
            key={video?.uuid}
          />
        ))}
      </TrendingVideosPageLayout>
    </PageLayout>
  );
}
