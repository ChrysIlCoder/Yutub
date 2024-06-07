import { useNavigate } from 'react-router-dom'
import { IChannel } from '../../../../models/Channels'
import './SubscriptionsChannelCard.scss'

export default function SubscriptionsChannel({ ...props }: IChannel) {
  const navigate = useNavigate()

  return (
    <div className='subscriptions_channel_cards_container' onClick={() => navigate(`/channel/${props.id}`)}>
      <img className='subscriptions_channel_cards_container__profile_pic' src={props.channel_profile_pic} alt="" />
      <div className='subscriptions_channel_cards_container__channel_info'>
        <h1 className='subscriptions_channel_cards_container__channel_info__name'>{props.name}</h1>
        <span className='subscriptions_channel_cards_container__channel_info__subs_count'>{props.subscribers_count} subs</span>
      </div>
      <p className='subscriptions_channel_cards_container__desc'>{props.description}</p>
    </div>
  )
}
