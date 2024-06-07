import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Modal.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import CircleButton from "../CircleButton/CircleButton";
import { useDispatch, useSelector } from "react-redux";
import { modalSelector } from "../../redux/features/modal/modalSlice";
import { modalActions } from "../../redux/features/modal";

export function Modal() {
  const modal = useSelector(modalSelector.getModalState);
  const dispatch = useDispatch();

  return modal.body !== undefined ? (
    <div className="modal_container">
      <div className="modal_container__modal_content">
        <div className="modal_container__modal_content__header">
          <h1 className="modal_container__modal_content__header__text">
            {modal.title}
          </h1>
          <CircleButton
            onClick={() =>
              dispatch(
                modalActions.setModal({ body: undefined })
              )
            }
            label="Close"
          >
            <FontAwesomeIcon size="lg" icon={faX} />
          </CircleButton>
        </div>
        <div className="modal_container__modal_content__content">
          {modal.body}
        </div>
      </div>
    </div>
  ) : null;
}
