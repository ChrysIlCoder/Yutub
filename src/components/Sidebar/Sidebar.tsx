import FlatButton from "../FlatButton/FlatButton";
import SidebarArea from "./Components/SidebarArea/SidebarArea";

import {
  faArrowTrendUp,
  faCircleQuestion,
  faFilm,
  faGears,
  faHouse,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { accountsSelector } from "../../redux/saga/accounts/slice/accountsSlice";

interface IButtonProps {
  icon: any;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ISectionsProps {
  title?: string;
  divisor?: boolean;
  options: IButtonProps[];
}

interface ISideBarMapping {
  [key: string]: ISectionsProps;
}

export default function Sidebar() {
  const navigate = useNavigate();

  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo)
  const logged_in = useSelector(accountsSelector.getLoggedIn)

  const SIDEBAR_MAPPING: ISideBarMapping = {
    videos: {
      options: [
        {
          icon: faHouse,
          label: "Home",
          onClick: () => navigate("/")
        },
        {
          icon: faArrowTrendUp,
          label: "Trending",
          onClick: () => navigate("/trending")
        }
      ]
    },
    user: {
      title: "You",
      divisor: true,
      options: [
        {
          icon: faUser,
          label: "Channel",
          onClick: () => logged_in ? navigate(`/channel/${logged_in_account?.user?.channel?.id}`) : navigate('account/enter')
        },
        {
          icon: faFilm,
          label: "Subscriptions",
          onClick: () => logged_in ? navigate(`/${logged_in_account?.user?.id}/subscriptions`) : navigate('account/enter')
        },
      ]
    },
    settings: {
      title: "Options",
      divisor: true,
      options: [
        {
          icon: faGears,
          label: "Settings",
          onClick: () => navigate(`/settings`)
        },
        {
          icon: faCircleQuestion,
          label: "Help",
          onClick: () => window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
      ]
    }
  };

  return (
    <div className="sidebar_container">
      {Object.values(SIDEBAR_MAPPING).map(
        (section: ISectionsProps, index: number) => (
          <SidebarArea
            key={index}
            title={section.title}
            divisor={section.divisor}
          >
            {section.options.map((option: IButtonProps, index: number) => (
              <FlatButton
                key={index}
                label={option.label}
                icon={option.icon}
                disabled={option.disabled}
                onClick={option.onClick}
              />
            ))}
          </SidebarArea>
        )
      )}
    </div>
  );
}
