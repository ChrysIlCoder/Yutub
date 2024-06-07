import "./VideoPlayer.scss";
import VideoInformationBox from "../VideoInformationBox/VideoInformationBox";
import { useSelector } from "react-redux";
import { videosSelector } from "../../redux/saga/videos/slice/videosSlice";

export default function VideoPlayer() {
  const video_info = useSelector(videosSelector.getVideoInfo);

  return (
    <div className="video_player_container">
      <div className="video_player_container__video_player_video_frame">
        <video
          src={video_info?.video_info?.video_url}
          title="Video Player"
          controls
        ></video>
      </div>
      <VideoInformationBox />
    </div>
  );
}
