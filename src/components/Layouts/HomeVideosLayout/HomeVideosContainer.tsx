import { useSelector } from "react-redux";
import "./HomeVideosContainer.scss";
import { navbarSelector } from "../../../redux/features/navbar/navbarSlice";
import { videosSelector } from "../../../redux/saga/videos/slice/videosSlice";

export default function HomeVideosContainer({ children }: any) {
  const sidebar_status = useSelector(navbarSelector.getSidebarState);
  const videos = useSelector(videosSelector.getVideosList);

  return (
    <div
      style={
        !sidebar_status
          ? { gridColumn: "span 2" }
          : videos?.videos?.length >= 3
          ? { justifyItems: "center" }
          : { justifyItems: "left" }
      }
      className="videos_container"
    >
      {children}
    </div>
  );
}
