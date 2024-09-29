import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import {useContext} from "react";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { useForm } from "../../hooks/useForm";
import { requiredValidator,minValidator,maxValidator,emailValidator } from "../../Components/validators/rules";
import AuthContext from "../../context/authContext";
import "./Register.css";

export default function Register() {

  const authContext = useContext(AuthContext)

   
   
  const [formState,onInputHandler] = useForm({
    name:{
      value:'',
      isValid:false
    },
    username:{
      value:'',
      isValid:false
    },
    email:{
      value:'',
      isValid:false
    },
    password:{
      value:'',
      isValid:false
    }
  },false)
  
  const navigate = useNavigate()


  const registerNewUser = async (event) => {
    let newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword:formState.inputs.password.value,
    }

    if(formState.isFormValid){
       fetch('http://localhost:4000/v1/auth/register',{
        method:'POST',
        headers:{
          "Content-type": 'application/json'
        },
        body: JSON.stringify(newUserInfos)
      }).then(res => res.json())
        .then(result => {
          console.log(result.accessToken)
          authContext.login(result.user,result.accessToken)
          navigate('/')
        })
    }

    event.preventDefault()

    console.log('User Register');
  }

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
            <Input
                type="text"
                id='name'
                placeholder="نام و نام خانوادگی"
                className="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(4),
                  maxValidator(50)
                ]}
              />
              <Input
                type="text"
                id='username'
                placeholder="نام کاربری"
                className="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(4),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="text"
                id='email'
                placeholder="آدرس ایمیل"
                className="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  emailValidator()
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="password"
                id='password'
                placeholder="رمز عبور"
                className="login-form__password-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20)
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="button"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}
            >
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
