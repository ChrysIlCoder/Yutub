import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import "./PostNewVideo.scss";
import { useDispatch, useSelector } from "react-redux";
import { IVideo } from "../../../models/Videos";
import { accountsSelector } from "../../redux/saga/accounts/slice/accountsSlice";
import { videosSagaActions } from "../../redux/saga/videos/slice/videosSlice";
import { useNavigate } from "react-router-dom";
import { messageBoxActions } from "../../redux/features/messageBox";
import { modalActions } from "../../redux/features/modal";

export default function PostNewVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  const logged_in = useSelector(accountsSelector.getLoggedIn)
  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo)
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleSubmitForm = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail_file", data.thumbnail_file[0]);
    formData.append("video_file", data.video_file[0]);
    formData.append("channel", JSON.stringify(logged_in_account?.user?.channel))

    dispatch(videosSagaActions.sagaPostVideo(formData, (res: IVideo) => {
      if (res?.status === 200) {
        dispatch(messageBoxActions.setMessageBoxState({ message: "Video uploaded succesfully", onClick: () => {
          navigate(`/videos/watch/${res.uuid}`)
          dispatch(modalActions.setModal({ body: undefined }))
        }, opened: true }));
      } else {
        alert("Error uploading video");
      }
    }, () => {
      alert('Nope')
    }))
  };

  return logged_in ? (
    <div className="upload_video_container">
      <form
        className="upload_video_container__form"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <InputField
          input="input"
          label="Title"
          options={{ type: "text", placeholder: "Your video's title" }}
          register={register}
          required
          name="title"
          errors={errors}
        />
        <InputField
          input="textarea"
          label="Description"
          options={{
            placeholder: "Video Description...",
            cols: 30,
            rows: 10
          }}
          styles={{ fontSize: 14 }}
          register={register}
          name="description"
          errors={errors}
        />
        <div className="upload_video_container__form__files_upload_container">
          <InputField
            input="input"
            label="Thumbnail"
            options={{
              type: "file",
              accept: ".png, .jpg, .jpeg"
            }}
            name="thumbnail_file"
            register={register}
            required
            errors={errors}
          />
          <InputField
            input="input"
            label="File"
            options={{
              type: "file",
              accept: ".mp4"
            }}
            name="video_file"
            register={register}
            required
            errors={errors}
          />
        </div>
        <Button className="upload_video_container__form__upload_button">Upload</Button>
      </form>
    </div>
  ) : dispatch(messageBoxActions.setMessageBoxState({ message: "To upload you have to be logged in", onClick: () => {
    navigate('/account/enter')
  }, opened: true }));
}
