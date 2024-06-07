import { IVideo } from '../../../models/Videos'
import './VideoCardHorizontal.scss'
import { useNavigate } from 'react-router-dom'

export default function VideoCardHorizontal({ ...props }: IVideo) {
  const navigate = useNavigate()

  return (
    <div className='video_card_horizontal_container' onClick={() => {navigate(`/videos/watch/${props.uuid}`)}}>
      <img className='video_card_horizontal_container__thumbnail' src={props.video_info.thumbnail_url} alt={props.video_info.title} />
      <div className='video_card_horizontal_container__video_info'>
        <h1 className='video_card_horizontal_container__video_info__title'>{props.video_info.title}</h1>
        <span className='video_card_horizontal_container__video_info__channel_name'><a href={`/channel/${props.channel.id}`}>{props.channel.name}</a></span>
        <div className='video_card_horizontal_container__video_info__stats'>
          <span className='video_card_horizontal_container__video_info_stats__views'>{props.views} views</span>
          <span>•</span>
          <span className='video_card_horizontal_container__video_info_stats__created_at'>{props.created_at}</span>
        </div>
      </div>
    </div>
  )
}
