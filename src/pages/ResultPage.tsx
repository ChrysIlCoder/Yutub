import PageLayout from "../components/Layouts/PageLayout/PageLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  videosSagaActions,
  videosSelector
} from "../redux/saga/videos/slice/videosSlice";
import stringSimilarity from "string-similarity";
import ResultsPageLayout from "../components/Layouts/ResultsPageLayout/ResultsPageLayout";
import VideoCardHorizontal from "../components/VideoCardHorizontal/VideoCardHorizontal";
import { IVideo } from "../../models/Videos";
import { format } from "date-fns";
import { navbarActions } from "../redux/features/navbar";

export default function ResultPage() {
  const [searchResults, setSearchResults] = useState<any>([]);

  const query = new URLSearchParams(new URL(window.location.href).search).get('query');

  const videosList = useSelector(videosSelector.getVideosList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(videosSagaActions.sagaGetVideos());
    dispatch(navbarActions.setOpenSidebar(true))
  }, []);

  useEffect(() => {
    if (query && videosList.videos) {
      const sortedVideos = [...videosList.videos].sort((a, b) => {
        const similarityA = stringSimilarity.compareTwoStrings(
          a.video_info.title.toLowerCase(),
          query.toLowerCase()
        );
        const similarityB = stringSimilarity.compareTwoStrings(
          b.video_info.title.toLowerCase(),
          query.toLowerCase()
        );

        return similarityB - similarityA;
      });

      setSearchResults(sortedVideos);
    } else if (videosList.videos) {
      setSearchResults([...videosList.videos]);
    }
  }, [videosList, query]);

  return (
    <PageLayout>
      <ResultsPageLayout>
        <span>Results for: {query}</span>
        <div style={{ padding: '1rem'}}>
          {searchResults.map((video: IVideo) => (
            <VideoCardHorizontal
              {...video}
              created_at={format(new Date(video.created_at), "dd/MM/yyyy")}
              key={video.uuid}
            />
          ))}
        </div>
      </ResultsPageLayout>
    </PageLayout>
  );
}
