import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/Button";
import "./MessageBox.scss";
import { messageBoxSelector } from "../../../redux/features/messageBox/messageBoxSlice";
import { messageBoxActions } from "../../../redux/features/messageBox";

export default function MessageBox() {
  const dispatch = useDispatch()
  const message_box = useSelector(messageBoxSelector.getMessageBox)

  return message_box.opened && (
    <div className="message_box_container">
      <div className="message_box_container__message_box">
        <p className="message_box_container__message_box__message">{message_box.message}</p>
        <div className="message_box_container__message_box__options">
          <Button
            className="message_box_container__message_box__options__cancel_button"
            onClick={() => dispatch(messageBoxActions.setMessageBoxState({ opened: false }))}
          >
            Cancel
          </Button>
          <Button
            className="message_box_container__message_box__options__continue_button"
            onClick={() => {
              message_box.onClick && message_box.onClick()
              dispatch(messageBoxActions.setMessageBoxState({ opened: false }))
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
