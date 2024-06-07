import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/Button";
import "./ChannelTabs.scss";
import { channelsActions } from "../../../redux/saga/channels/slice";
import { channelsSelectors } from "../../../redux/saga/channels/slice/channelsSlice";

interface TabsProps {
  label: string;
  onClick: () => void;
  active: boolean;
}

export default function ChannelTabs() {
  const channel_tab = useSelector(channelsSelectors.getSelectedTab)
  const dispatch = useDispatch();

  const CHANNEL_TABS_MAPPING: TabsProps[] = [
    {
      label: "Videos",
      onClick: () => dispatch(channelsActions.setSelectedTab("videos")),
      active: channel_tab === 'videos'
    },
    {
      label: "Subscriptions",
      onClick: () => dispatch(channelsActions.setSelectedTab("subscribed")),
      active: channel_tab === 'subscribed'
    },
    {
      label: "Informations",
      onClick: () => dispatch(channelsActions.setSelectedTab("informations")),
      active: channel_tab === 'informations',
    },
  ];

  return (
    <div className="channel_tabs_container">
      {CHANNEL_TABS_MAPPING.map((tab, index) => (
        <Button
          className="channel_tabs_container__tab_button"
          key={index}
          onClick={tab.onClick}
          styles={tab.active ? {color: 'black', borderBottom: 'solid 2px black'} : undefined}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
