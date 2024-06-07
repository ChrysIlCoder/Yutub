import { useSelector } from 'react-redux'
import { channelsSelectors } from '../../../redux/saga/channels/slice/channelsSlice'
import './ChannelInformations.scss'

export default function ChannelInformations() {
  const channel_info = useSelector(channelsSelectors.getChannelByIdInfo)

  return (
    <div className='channel_informations_container'>
      <div className='channel_informations_container__description_container'>
        <h1>Description</h1>
        <p>{channel_info.description}</p>
      </div>
    </div>
  )
}