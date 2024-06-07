import { faEllipsisVertical, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { format } from "date-fns"
import { useState } from "react"
import { IComment } from "../../../../models/Comments"
import { commentsSagaActions } from "../../../redux/saga/comments/slice/commentsSlice"
import CircleButton from "../../CircleButton/CircleButton"
import MenuDropdown from "../../MenuDropdown/MenuDropdown"
import { accountsSelector } from "../../../redux/saga/accounts/slice/accountsSlice"
import { useDispatch, useSelector } from "react-redux"
import './Comment.scss'
import InputField from "../../InputField/InputField"
import { useForm } from "react-hook-form"
import { messageBoxActions } from "../../../redux/features/messageBox"
import { useNavigate } from "react-router-dom"

interface ICommentState {
  options: boolean;
  menu: boolean;
  edit?: boolean;
}

export function Comment({ ...comment }: IComment) {
  const [commentState, setCommentState] = useState<ICommentState>({
    options: false,
    menu: false,
    edit: false,
  })
  const { register, handleSubmit, formState: {errors} } = useForm();

  const navigate = useNavigate()

  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo)
  const dispatch = useDispatch()

  const handleSubmitEditedComment = (data: any, id: string) => {
    const body = {
      ...data,
      id,
    }

    dispatch(messageBoxActions.setMessageBoxState({ message: "You're about to edit this comment", onClick: () => {
      dispatch(commentsSagaActions.sagaEditCommentById(body, (data) => {
        data.status === 204 ? window.location.reload() : alert("Comment not edited")
      }, () => {
        alert("Error in editing comment")
      }))
    }, opened: true }))
  }

  const handleSubmitDeleteComment = () => {
    dispatch(messageBoxActions.setMessageBoxState({ message: "You're about to delete this comment", onClick: () => {
      dispatch(commentsSagaActions.sagaDeleteCommentById(comment.id, (data) => {
        if (data.status === 200) {
          window.location.reload()
        } else {
          alert("Error in deleting comment")
        }
      }, () => {}))
    }, opened: true }))
  }

  return (
    <div className="comment_container" onMouseEnter={() => setCommentState(prevState => ({ ...prevState, options: true }))} onMouseLeave={() => {
      setCommentState({ options: false, menu: false, edit: false })
    }}>
      <div className="comment_container__comment">
        <img className="comment_container__comment__profile_pic" src={comment.comment_info?.channel?.channel_profile_pic} alt="profile_pic" />
        <div className="comment_container__comment__comment_info">
          <div className="comment_container__comment__comment_info__info">
            <h2 className="comment_container__comment__comment_info__info__owner" onClick={() => navigate(`/channel/${comment?.comment_info?.channel?.id}`)}>{comment.comment_info?.channel?.name}</h2>
            <span>•</span>
            <span className="comment_container__comment__comment_info__info__date">{format(new Date(comment?.created_at), "dd/MM/yyyy")}</span>
          </div>
          {!commentState.edit 
            ? <p className="comment_container__comment__comment_info__text">{comment.comment_info?.comment}</p> 
            : (
              <form onSubmit={handleSubmit((data) => handleSubmitEditedComment(data, comment.id))}>
                <InputField
                  input="input"
                  name="edited_comment"
                  options={{ placeholder: "Edit your comment...", type: "text" }}
                  register={register}
                  classname="comment_container__comment__comment_info__input_field"
                  errors={errors}
                  required
                />
              </form>
            )
          }
        </div>
      </div>
      {commentState.options && logged_in_account?.user?.channel?.id === comment.comment_info?.channel?.id && (
        <div className="comment_container__options_menu">
          <CircleButton label="Options" onClick={() => setCommentState({ menu: !commentState.menu, options: true })}>
            <FontAwesomeIcon size="lg" icon={faEllipsisVertical} />
          </CircleButton>
          {commentState.menu && (
            <MenuDropdown
              options={[
                {label: 'Edit', icon: faPencil, onClick: () => setCommentState({ edit: true, options: false, menu: false })},
                {label: 'Delete', icon: faTrashCan, onClick: handleSubmitDeleteComment },
              ]}
              className="comment_container__options_menu__menu"
            />
          )}
        </div>
      )}
    </div>
  )
}