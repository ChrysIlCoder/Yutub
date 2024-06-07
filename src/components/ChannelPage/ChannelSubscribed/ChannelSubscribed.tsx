import { useDispatch, useSelector } from 'react-redux'
import './ChannelSubscribed.scss'
import { accountsSagaActions, accountsSelector } from '../../../redux/saga/accounts/slice/accountsSlice'
import { useEffect } from 'react'
import { channelsSelectors } from '../../../redux/saga/channels/slice/channelsSlice'
import { IChannel } from '../../../../models/Channels'
import { useNavigate } from 'react-router-dom'

export default function ChannelSubscribed() {
  const channel_info = useSelector(channelsSelectors.getChannelByIdInfo)
  const account_subscriptions = useSelector(accountsSelector.getAccountSubscriptionsInfo)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(accountsSagaActions.sagaGetAccountSubscriptions(channel_info?.id))
  }, [channel_info?.id])

  const Channel = ({...props}: IChannel) => {
    return (
      <div className='channel_subscriptions_container__channel' onClick={() => navigate(`/channel/${props.id}`)}>
        <img className='channel_subscriptions_container__channel__profile_pic' src={props.channel_profile_pic} alt="" />
        <div className='channel_subscriptions_container__channel__info'>
          <h1 className='channel_subscriptions_container__channel__info__name'>{props.name}</h1>
          <span className='channel_subscriptions_container__channel__info__sub_count'>{props.subscribers_count} subscribers</span>
        </div>
      </div>
    )
  }

  return (
    <div className='channel_subscriptions_container'>
      {account_subscriptions.length > 0 ? account_subscriptions.map((sub, index) => (
        <Channel {...sub} key={index} />
      )) : <h1>This channel has no subscriptions</h1>}
    </div>
  )
}
