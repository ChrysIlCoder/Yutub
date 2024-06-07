import { useSelector } from 'react-redux'
import './ChannelScope.scss'
import { channelsSelectors } from '../../../redux/saga/channels/slice/channelsSlice'
import SubscribeButton from '../../SubscribeButton/SubscribeButton'
import { useNavigate } from 'react-router-dom'

export default function ChannelScope() {
  const channel_info = useSelector(channelsSelectors.getChannelByIdInfo)

  const navigate = useNavigate()

  return (
    <div className='channel_scope_container'>
      <img className='channel_scope_container__profile_pic' src={channel_info?.channel_profile_pic} alt={channel_info?.name} />
      <div className='channel_scope_container__info'>
        <div>
          <h1 className='channel_scope_container__info__channel_name'>{channel_info?.name}</h1>
          <h2 className='channel_scope_container__info__channel_sub_count'>{channel_info?.subscribers_count} subscribers</h2>
        </div>
        <SubscribeButton 
          channel={channel_info}
          onClickSetting={() => navigate('/settings')}
          setting='Settings'
        />
      </div>
    </div>
  )
}
