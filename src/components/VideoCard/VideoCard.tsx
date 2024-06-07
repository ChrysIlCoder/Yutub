import { useNavigate } from 'react-router-dom';
import './VideoCard.scss'
import { IVideo } from '../../../models/Videos';

export default function VideoCard({ ...props }: IVideo) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/videos/watch/${props.uuid}`)
  }

  return (
    <div className='video_card_container' onClick={handleClick}>
      <img className='video_card_container__thumbnail' src={props.video_info.thumbnail_url} alt={props.video_info.title} />
      <div className='video_card_container__video_informations_container'>
        <div className='video_card_container__video_informations_container__channel_info'>      
          <h1 className='video_card_container__video_informations_container__channel_info__title'>{props.video_info.title}</h1>
          <span className='video_card_container__video_informations_container__channel_info__channel_name'><a href={`/channel/${props.channel.id}`}>{props?.channel.name}</a></span>
        </div>
        <div className='video_card_container__video_informations_container__video_info'>
          <span className='video_card_container__video_informations_container__video_info__views'>{props.views} views</span>
          <span className='video_card_container__video_informations_container__video_info__created_at'>{props.created_at}</span>
        </div>
      </div>
    </div>
  )
}
