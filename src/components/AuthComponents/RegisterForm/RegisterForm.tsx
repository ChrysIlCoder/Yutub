import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import InputField from "../../InputField/InputField";
import "./RegisterForm.scss";
import { useDispatch } from "react-redux";
import { accountsSagaActions } from "../../../redux/saga/accounts/slice/accountsSlice";
import { useNavigate } from "react-router-dom";
import { messageBoxActions } from "../../../redux/features/messageBox";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmitRegister = (data: any) => {
    console.log(data);

    dispatch(accountsSagaActions.sagaCreateNewAccount(data, (data) => {
      if (data.status === 200) {
        dispatch(messageBoxActions.setMessageBoxState({ message: `${data?.user?.username}'s Account registered`, onClick: () => navigate('/account/enter?type=login'), opened: true}))
      } else {
        dispatch(messageBoxActions.setMessageBoxState({ message: `Could not register account`, onClick: () => {}, opened: true}))
      }
    }, () => {}));
  };

  return (
    <form
      className="register_page_form_container"
      onSubmit={handleSubmit(handleSubmitRegister)}
    >
      <h1>Register</h1>
      <div className="register_page_form_container__form">
        <InputField
          input="input"
          label="First Name"
          name="first_name"
          errors={errors}
          register={register}
          options={{
            type: "text",
            placeholder: "First Name"
          }}
          required
        />
        <InputField
          input="input"
          label="Last Name"
          name="last_name"
          errors={errors}
          register={register}
          options={{
            type: "text",
            placeholder: "Last Name"
          }}
        />
        <InputField
          input="input"
          label="Username"
          name="username"
          errors={errors}
          register={register}
          options={{
            type: "text",
            placeholder: "Username"
          }}
          classname="register_page_form_container__form__span_2"
          required
        />
        <InputField
          input="input"
          label="Email"
          name="email"
          errors={errors}
          register={register}
          options={{
            type: "email",
            placeholder: "Email"
          }}
          classname="register_page_form_container__form__span_2"
          required
        />
        <InputField
          input="input"
          label="Password"
          name="password"
          errors={errors}
          register={register}
          options={{
            type: "password",
            placeholder: "Password"
          }}
          required
        />
        <InputField
          input="input"
          label="Confirm Password"
          name="password"
          errors={errors}
          register={register}
          options={{
            type: "password",
            placeholder: "Confirm password"
          }}
          required
        />
      </div>
      <Button className="register_page_form_container__submit">Register</Button>
    </form>
  );
}
