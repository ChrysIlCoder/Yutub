import { useDispatch, useSelector } from "react-redux";
import "./ChannelSettings.scss";
import { accountsSelector } from "../../../redux/saga/accounts/slice/accountsSlice";
import { messageBoxActions } from "../../../redux/features/messageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faPen } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import InputField from "../../InputField/InputField";
import { useForm } from "react-hook-form";
import { channelsSagaActions } from "../../../redux/saga/channels/slice/channelsSlice";

interface IModifableObjectProps {
  children: any;
  placeholder_text?: string;
  image?: boolean;
  input?: 'input' | 'textarea';
  onClick: (data: any) => void;
}

export default function ChannelSettings() {
  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const ModifiableObject = ({children, input, placeholder_text, image, onClick}: IModifableObjectProps) => {
    const [modify, setModify] = useState(false);
    const [upload, setUpload] = useState(false);
    const fileRef = useRef<any>(null)
    const formRef = useRef<any>(null)

    const handleDivClick = () => {
      if (fileRef.current) {
        fileRef.current.click();
      }
    };
  
    const handleFileChange = (event: any) => {
      const file = event.target.files[0];
      
      onClick(file)
    };

    return !image ? (
      <form ref={formRef} className="modifiable_object_container" onSubmit={handleSubmit((data) => onClick(data))}>
        {!modify ? (
          children
        ) : (
          input === "input" ? <InputField
            input="input"
            name="modified_input"
            errors={errors}
            register={register}
            options={{
              placeholder: placeholder_text,
            }}
          /> :
          <InputField
            input="textarea"
            name="modified_input"
            errors={errors}
            register={register}
            options={{
              placeholder: placeholder_text,
              onKeyDown: (e: any) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevent default behavior
                  const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
                  formRef.current.dispatchEvent(submitEvent); // Manually dispatch the submit event
                }
              }
            }}
            styles={{
              width: '35vw',
            }}
          />
        )}
        <div
          className="modifiable_object_container__pen"
          onClick={() => setModify((prevState) => !prevState)}
        >
          <FontAwesomeIcon icon={faPen} size="xs" />
        </div>
      </form>
    ) : (
      <div className="modifiable_object_container">
        <div
          className="modifiable_object_container__clickable_image"
          onMouseEnter={() => setUpload(true)}
          onMouseLeave={() => setUpload(false)}
          onClick={handleDivClick}
        >
          {upload && (
            <div className="modifiable_object_container__clickable_image__upload_icon">
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                size="2xl"
                color="white"
              />
              <span>Change</span>
            </div>
          )}
          <input 
            type="file" 
            style={{ display: 'none' }}
            accept=".png, .jpeg, .jpg"
            ref={fileRef}
            onChange={handleFileChange}
          />
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="account_settings_container">
      <ModifiableObject image onClick={(file) => dispatch(messageBoxActions.setMessageBoxState({ message: "You're about to modify your banner", onClick: () => {
        dispatch(channelsSagaActions.sagaModifyChannelInfo({new_banner: file}, logged_in_account?.user?.channel?.id, "banner", (res) => {
          if (res.status === 204) {
            window.location.reload()
          }
        }, () => {}))
      }, opened: true}))}>
        <img
          src={logged_in_account?.user?.channel?.channel_banner}
          alt="Channel banner"
          className="account_settings_container__channel_banner"
        />
      </ModifiableObject>
      <div className="account_settings_container__account_settings_info">
        <ModifiableObject image onClick={(file) => dispatch(messageBoxActions.setMessageBoxState({ message: "You're about to modify your profile picture", onClick: () => {
          dispatch(channelsSagaActions.sagaModifyChannelInfo({new_profile_pic: file}, logged_in_account?.user?.channel?.id, "profile_pic", (res) => {
            if (res.status === 204) {
              window.location.reload()
            }
          }, () => {}))
        }, opened: true}))}>
          <img
            className="account_settings_container__account_settings_info__profile_pic"
            src={logged_in_account?.user?.channel?.channel_profile_pic}
            alt="Channel pic"
          />
        </ModifiableObject>
        <div className="account_settings_container__account_settings_info__account_info">
          <div className="account_settings_container__account_settings_info__account_info__hero">
            <ModifiableObject
              placeholder_text={logged_in_account?.user?.channel?.name}
              onClick={(data) => dispatch(messageBoxActions.setMessageBoxState({ message: "You're about to modify the name of the channel", onClick: () => {
                dispatch(channelsSagaActions.sagaModifyChannelInfo({new_text: data.modified_input}, logged_in_account?.user?.channel?.id, "name", (res) => {
                  if (res.status === 204) {
                    window.location.reload()
                  }
                }, () => {}))
              }, opened: true}))}
            >
              <h1 className="account_settings_container__account_settings_info__account_info__hero__channel_name">
                {logged_in_account?.user?.channel?.name}
              </h1>
            </ModifiableObject>
            <span className="account_settings_container__account_settings_info__account_info__hero__sub_count">
              {logged_in_account?.user?.channel?.subscribers_count} subscribers
            </span>
          </div>
          <ModifiableObject
            input="textarea"
            placeholder_text={logged_in_account?.user?.channel?.description}
            onClick={(data) => dispatch(messageBoxActions.setMessageBoxState({ message: "You're about to modify the description of the channel", onClick: () => {
              dispatch(channelsSagaActions.sagaModifyChannelInfo({new_text: data.modified_input}, logged_in_account?.user?.channel?.id, "description", (res) => {
                if (res.status === 204) {
                  window.location.reload()
                }
              }, () => {}))
            }, opened: true}))}
          >
            <p>{logged_in_account?.user?.channel?.description}</p>
          </ModifiableObject>
        </div>
      </div>
    </div>
  );
}
