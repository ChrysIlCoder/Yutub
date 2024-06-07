import { useSelector } from 'react-redux'
import { channelsSelectors } from '../../../redux/saga/channels/slice/channelsSlice'
import './ChannelBanner.scss'

export default function ChannelBanner() {
  const channel_info = useSelector(channelsSelectors.getChannelByIdInfo)

  return (
    <div className='channel_banner_container'>
      <img src={channel_info?.channel_banner} alt='Channel banner' height={300} />
    </div>
  )
}
