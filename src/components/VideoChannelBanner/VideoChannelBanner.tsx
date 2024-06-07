import { useNavigate } from "react-router-dom";
import "./VideoChannelBanner.scss";
import { useSelector } from "react-redux";
import { videosSelector } from "../../redux/saga/videos/slice/videosSlice";
import SubscribeButton from "../SubscribeButton/SubscribeButton";

export default function VideoChannelBanner() {
  const video_info = useSelector(videosSelector.getVideoInfo)
  const navigate = useNavigate();

  return (
    <div className="video_owner_channel_banner_container">
      <div
        className="video_owner_channel_banner_container__owner_information"
        onClick={() => navigate(`/channel/${video_info?.channel?.id}`)}
      >
        <img
          className="video_owner_channel_banner_container__owner_information__profile_pic"
          src={video_info?.channel?.channel_profile_pic}
          alt={video_info?.channel?.name}
        />
        <div className="video_owner_channel_banner_container__owner_information__channel_info">
          <h2 className="video_owner_channel_banner_container__owner_information__channel_info__nickname">
            {video_info?.channel?.name}
          </h2>
          <p className="video_owner_channel_banner_container__owner_information__channel_info__subscribers_count">
            {video_info?.channel?.subscribers_count} subscribers
          </p>
        </div>
      </div>
      <SubscribeButton 
        channel={video_info?.channel}
        onClickSetting={() => {}}
        setting="Modify Video"
      />
    </div>
  );
}
