import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Navbar.scss";
import youtube_logo_light from "../../assets/icons/youtube_logo_light.png";
import youtube_logo_dark from "../../assets/icons/youtube_logo_dark.png";
import {
  faGear,
  faUserMinus,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import CircleButton from "../CircleButton/CircleButton";
import { useDispatch, useSelector } from "react-redux";
import { navbarActions } from "../../redux/features/navbar";
import { navbarSelector } from "../../redux/features/navbar/navbarSlice";
import { modalActions } from "../../redux/features/modal";
import PostNewVideo from "../PostNewVideo/PostNewVideo";
import { useNavigate } from "react-router-dom";
import { accountsSelector } from "../../redux/saga/accounts/slice/accountsSlice";
import { useState } from "react";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import { messageBoxActions } from "../../redux/features/messageBox";
import { accountsActions } from "../../redux/saga/accounts/slice";
import SearchBar from "./SearchBar/SearchBar";

interface IBurger {
  onClick: () => void;
}

interface INavbarProps {
  disabled_sidebar?: boolean;
}

export default function Navbar({ disabled_sidebar }: INavbarProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebar_status = useSelector(navbarSelector.getSidebarState);
  const color_theme = localStorage.getItem('nightowl-color-scheme') === 'light'

  const logged_in = useSelector(accountsSelector.getLoggedIn);
  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo);

  const Burger = ({ onClick }: IBurger) => (
    <div
      className="navbar_container__left_header__burger_container"
      onClick={onClick}
    >
      <span className="navbar_container__left_header__burger_container__line"></span>
      <span className="navbar_container__left_header__burger_container__line"></span>
      <span className="navbar_container__left_header__burger_container__line"></span>
    </div>
  );

  return (
    <div
      className="navbar_container"
      style={disabled_sidebar ? { paddingInline: "2rem" } : undefined}
    >
      <div className="navbar_container__left_header">
        {disabled_sidebar ? null : (
          <CircleButton label="Sidebar">
            <Burger
              onClick={() =>
                dispatch(navbarActions.setOpenSidebar(!sidebar_status))
              }
            />
          </CircleButton>
        )}
        <img
          className="navbar_container__left_header__logo"
          onClick={() => navigate("/")}
          src={color_theme ? youtube_logo_light : youtube_logo_dark}
        />
      </div>
      <div className="navbar_container__center_header">
        <SearchBar />
      </div>
      <div className="navbar_container__right_header">
        <CircleButton
          onClick={() =>
            dispatch(
              modalActions.setModal({
                title: "Upload new video",
                //@ts-ignore
                body: <PostNewVideo />
              })
            )
          }
          label="Upload video"
        >
          <FontAwesomeIcon size="lg" icon={faSquarePlus} />
        </CircleButton>
        <CircleButton
          label={!logged_in ? "Login" : "Account"}
          onClick={() =>
            !logged_in
              ? navigate("/account/enter")
              : setOpenMenu(prevState => !prevState)
          }
        >
          {!logged_in ? (
            <FontAwesomeIcon size="lg" icon={faUser} />
          ) : (
            <img
              className="navbar_container__right_header__profile_pic"
              src={logged_in_account?.user?.channel?.channel_profile_pic}
            />
          )}
        </CircleButton>
        {openMenu && (
          <MenuDropdown
            options={[
              {
                label: "Channel",
                icon: faVideo,
                onClick: () => {
                  navigate(`/channel/${logged_in_account?.user?.channel?.id}`);
                }
              },
              {
                label: "Settings",
                icon: faGear,
                onClick: () => {
                  navigate(`/settings`);
                }
              },
              {
                label: "Logout",
                icon: faUserMinus,
                onClick: () => {
                  dispatch(
                    messageBoxActions.setMessageBoxState({
                      message: "You're about to logout from your account",
                      onClick: () => {
                        window.localStorage.removeItem("account_info");
                        dispatch(accountsActions.setLoggedIn(false));
                        dispatch(accountsActions.setLoggedAccountInfo({}));
                        window.location.reload();
                      },
                      opened: true
                    })
                  );
                }
              }
            ]}
            onClose={() => setOpenMenu(false)}
            className="navbar_container__right_header__account_menu_dropdown_container"
          />
        )}
      </div>
    </div>
  );
}
