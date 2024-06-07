import { useForm } from "react-hook-form";
import "./CommentsSection.scss";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { IComment, INewComment } from "../../../models/Comments";
import { useDispatch, useSelector } from "react-redux";
import { commentsSagaActions, commentsSelector } from "../../redux/saga/comments/slice/commentsSlice";
import { useEffect } from "react";
import { accountsSelector } from "../../redux/saga/accounts/slice/accountsSlice";
import { Comment } from './CommentComponent/Comment'
import { messageBoxActions } from "../../redux/features/messageBox";
import { videosSelector } from "../../redux/saga/videos/slice/videosSlice";

export default function CommentsSection() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const videos_comments = useSelector(commentsSelector.getVideosCommentsInfo)
  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo)
  const logged_in = useSelector(accountsSelector.getLoggedIn)

  const dispatch = useDispatch()

  const video_info = useSelector(videosSelector.getVideoInfo)
  const navigate = useNavigate()

  const handleSubmitComment = (data: any) => {
    if (logged_in) {
      const body: INewComment = {
        comment: data.comment,
        channel: logged_in_account.user.channel,
        video_uuid: video_info?.uuid
      }
  
      dispatch(commentsSagaActions.sagaCreateNewCommentWithVideoUUID(body, () => {
        dispatch(commentsSagaActions.sagaGetCommentsOfVideoUUID(body.video_uuid))
      }, (error: any) => {
        alert("Failed to create comment")
        console.log(error)
      }))
    } else {
      dispatch(messageBoxActions.setMessageBoxState({ message: 'You have to be logged in to comment', onClick: () => {
        navigate('/account/enter')
      }, opened: true }))
    }
  };

  useEffect(() => {
    dispatch(commentsSagaActions.sagaGetCommentsOfVideoUUID(video_info?.uuid))
  }, [video_info])

  return (
    <div className="comments_section_container">
      <form className="comments_section_container__form" onSubmit={handleSubmit(handleSubmitComment)}>
        <InputField
          input="input"
          name="comment"
          options={{ placeholder: "Add a public comment...", type: "text" }}
          register={register}
          classname="comments_section_container__form__comment_field"
          errors={errors}
          required
        />
        <Button
          className="comments_section_container__form__comment_submit"
          onClick={() => {}}
        >
          Comment
        </Button>
      </form>
      <div className="comments_section_container__comments_container">
        <h1 className="comments_section_container__comments_container__header">
          {videos_comments?.comments?.length === 1 ? `1 Comment` : videos_comments?.comments?.length > 0 ? `${videos_comments?.comments?.length} Comments` : ""}
        </h1>
        {videos_comments?.comments?.length > 0 ? (
          videos_comments?.comments?.map((comment: IComment, index: number) => <Comment key={index} {...comment} />)
        ) : (
          <div className="comments_section_container__comments_container__no_comments">
          <h1>No one commented on this video yet</h1>
        </div>
        )}
      </div>
    </div>
  );
}
