import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLayout from "../components/Layouts/PageLayout/PageLayout";
import { navbarActions } from "../redux/features/navbar";
import { useParams } from "react-router-dom";
import { channelsSagaActions, channelsSelectors } from "../redux/saga/channels/slice/channelsSlice";
import ChannelPageLayout from "../components/Layouts/ChannelPageLayout/ChannelPageLayout";
import ChannelBanner from "../components/ChannelPage/ChannelBanner/ChannelBanner";
import ChannelScope from "../components/ChannelPage/ChannelScope/ChannelScope";
import ChannelTabs from "../components/ChannelPage/ChannelTabs/ChannelTabs";
import ChannelVideos from "../components/ChannelPage/ChannelVideos/ChannelVideos";
import ChannelInformations from "../components/ChannelPage/ChannelInformations/ChannelInformations";
import ChannelSubscribed from "../components/ChannelPage/ChannelSubscribed/ChannelSubscribed";


export default function ChannelPage() {
  const current_tab = useSelector(channelsSelectors.getSelectedTab)
  const channel_info = useSelector(channelsSelectors.getChannelByIdInfo)
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(navbarActions.setOpenSidebar(true))
    dispatch(channelsSagaActions.sagaGetChannelById(id))
  }, [id])
  
  useEffect(() => {document.title = `${channel_info?.name} - Channel`}, [channel_info])

  return (
    <PageLayout>
      <ChannelPageLayout>
        <ChannelBanner />
        <ChannelScope />
        <ChannelTabs />
        {current_tab === 'videos' ? (
          <ChannelVideos />
        ) : current_tab === 'informations' ? (
          <ChannelInformations />
        ) : current_tab === 'subscribed' ? (
          <ChannelSubscribed />
        ): null}
      </ChannelPageLayout>
    </PageLayout>
  )
}
