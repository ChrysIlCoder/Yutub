import "./VideoInformationBox.scss";
import { useState } from "react";
import { COLORS } from "../../constants/styles/COLORS";
import { useSelector } from "react-redux";
import { videosSelector } from "../../redux/saga/videos/slice/videosSlice";
import { format } from "date-fns";

export default function VideoInformationBox() {
  const [showDescription, setShowDescription] = useState(false);
  const video_info = useSelector(videosSelector.getVideoInfo)

  return (
    <div className="video_information_box_container">
      <div className="video_information_box_container__video_basic_info">
        <div>
          <h1 className="video_information_box_container__video_basic_info__video_title">
            {video_info?.video_info?.title}
          </h1>
          <div className="video_information_box_container__video_basic_info__video_stats">
            <span>{video_info?.views} views</span>
            <span>•</span>
            <span>{video_info?.created_at ? format(new Date(video_info.created_at), 'dd/MM/yyyy') : 'Date'}</span>
          </div>
        </div>
        {video_info?.video_info?.description?.length > 0 ? (
          <span
            onClick={() => setShowDescription((prevState) => !prevState)}
            style={
              !showDescription
                ? { color: COLORS.butterfly_blue }
                : { color: "gray" }
            }
            className="video_information_box_container__video_basic_info__show_description"
          >
            {!showDescription ? "Show description..." : "Hide description..."}
          </span>
        ) : (
          <span className='video_information_box_container__video_basic_info__no_description'>No description</span>
        )}
      </div>
      {showDescription && (
        <div className="video_information_box_container__informations">
          <p className="video_information_box_container__informations__video_description">
            {video_info?.video_info?.description}
          </p>
        </div>
      )}
    </div>
  );
}
