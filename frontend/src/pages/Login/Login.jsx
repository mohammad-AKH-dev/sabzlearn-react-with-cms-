import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import { useForm } from "../../hooks/useForm";
import AuthContext from "../../context/authContext";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import withReactContent from "sweetalert2-react-content";

import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../components/validators/rules";

import "./Login.css";
import { useContext, useState } from "react";

export default function Login() {
  const [isGoogleRecapthaVerify,setIsGoogleRecapthaVerify] = useState(false)
  const mySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onChangeHandler = () => {
    console.log('google recaptcha verified')
    setIsGoogleRecapthaVerify(true)
  }

  const userLogin = (event) => {
    event.preventDefault();
    let userInfos = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };
    fetch("http://localhost:4000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfos),
    })
      .then((res) => {
        if (!res.ok) {
          mySwal.fire({
            title: "همچین کاربری وجود ندارد",
            icon: "error",
            width: "30%",
            grow: "row",
            confirmButtonText: "تلاش دوباره",
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        const token = result.accessToken;
        mySwal
          .fire({
            title: "لاگین با موفقیت انجام شد",
            icon: "success",
            width: "30%",
            grow: "row",
            confirmButtonText: "ورود به پنل کاربری",
          })
          .then((res) => {
            if (res.isConfirmed) {
              navigate("/");
              authContext.login({}, token);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                id="username"
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                element="input"
                validations={[requiredValidator(), minValidator(8)]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                element="input"
                id="password"
                type="password"
                className="login-form__password-input"
                placeholder="رمز عبور"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />

              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <ReCAPTCHA className="google-recaptha" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChangeHandler} />,
            <Button
              className={`login-form__btn ${
                formState.isFormValid && isGoogleRecapthaVerify
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="button"
              onClick={userLogin}
              disabled={!formState.isFormValid || !isGoogleRecapthaVerify}
            >
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
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
