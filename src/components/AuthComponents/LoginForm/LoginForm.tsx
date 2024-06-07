import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import InputField from "../../InputField/InputField";
import "./LoginForm.scss";
import { useDispatch } from "react-redux";
import { accountsSagaActions } from "../../../redux/saga/accounts/slice/accountsSlice";
import { accountsActions } from "../../../redux/saga/accounts/slice";
import { messageBoxActions } from "../../../redux/features/messageBox";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch()

  const handleSubmitLogin = (data: any) => {
    dispatch(accountsSagaActions.sagaLoginIntoAccount({ body: data, onSuccess: (res) => {
      if (res.status === 200) {
        dispatch(accountsActions.setLoggedIn(true))
        window.localStorage.setItem("account_info", JSON.stringify({ email: data.email, password: data.password }))
      } else {
        dispatch(messageBoxActions.setMessageBoxState({ message: 'Could not login', onClick: () => {}, opened: true }))
      }
    }, onFailure: (error: any) => {
      console.log("error:", error)
    } }))
  };

  return (
    <form className="login_page_form_container" onSubmit={handleSubmit(handleSubmitLogin)}>
      <h1>Login</h1>
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
      <Button className="login_page_form_container__submit">Login</Button>
    </form>
  );
}