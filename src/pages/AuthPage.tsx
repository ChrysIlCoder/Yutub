import PageLayout from "../components/Layouts/PageLayout/PageLayout";
import AuthPageLayout from "../components/Layouts/AuthPageLayout/AuthPageLayout";
import LoginForm from "../components/AuthComponents/LoginForm/LoginForm";
import { useEffect } from "react";
import RegisterForm from "../components/AuthComponents/RegisterForm/RegisterForm";
import Button from "../components/Button/Button";
import { useSelector } from "react-redux";
import { accountsSelector } from "../redux/saga/accounts/slice/accountsSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams({type: 'login'})
  const loginType = searchParams.get('type') === 'register'

  console.log(searchParams)

  const account = useSelector(accountsSelector.getLoggedAccountInfo)
  const logged_in = useSelector(accountsSelector.getLoggedIn)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = !loginType ? "Login" : "Register";
  }, [loginType]);

  useEffect(() => {
    setSearchParams(prev => {
      prev.set('type', 'login')
      return prev
    })
  }, [])

  useEffect(() => {
    logged_in && navigate(`/channel/${account.user.id}`)
  }, [logged_in])

  return (
    <PageLayout no_sidebar>
      <AuthPageLayout>
        {!loginType ? <LoginForm /> : <RegisterForm />}
        <Button
          styles={{ 
            background: 'none',
            textDecoration: 'underline',
            opacity: 0.7,
          }}
          onClick={() => setSearchParams(prev => {
            !loginType ? prev.set("type", 'register') : prev.set("type", 'login')
            return prev
          }, {replace: true})}
        >
          {!loginType ? "Register" : "Login"}
        </Button>
      </AuthPageLayout>
    </PageLayout>
  );
}
