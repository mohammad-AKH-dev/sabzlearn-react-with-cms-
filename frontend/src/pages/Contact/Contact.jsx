import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import { useNavigate } from "react-router-dom";
import { requiredValidator,emailValidator,minValidator,maxValidator } from "../../Components/validators/rules";
import "./Contact.css";
import { useForm } from "../../hooks/useForm";
import Button from "../../Components/Form/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Contact() {
  const mySwal = withReactContent(Swal);
  const navigate = useNavigate()
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    false
  );
   
  const addNewContact = (event) => {
    event.preventDefault()
    let newContactInfos = {
      name: formState.inputs.name.value.trim(),
      email: formState.inputs.email.value.trim(),
      phone: formState.inputs.phone.value.trim(),
      body: formState.inputs.body.value.trim()
    }
    fetch('http://localhost:4000/v1/contact',{
      method:'POST',
      headers:{
        "Content-type": 'application/json'
      },
      body: JSON.stringify(newContactInfos)
    }).then(res => {
      if(res.ok) {
        mySwal
        .fire({
          title: "پیغام شما با موفقیت به مدیران سایت ارسال شد",
          icon: "success",
          width: "30%",
          grow: "row",
          confirmButtonText: "اوکی",
        }).then(result => {
          if(result.isConfirmed){
              navigate('/')
          }
        })
      }
    })
    
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="name"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[requiredValidator(), minValidator(6), maxValidator(20)]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[requiredValidator(), minValidator(8), maxValidator(40), emailValidator()]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="phone"
                className="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
                validations={[requiredValidator(), minValidator(10), maxValidator(11)]}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                validations={[requiredValidator(), minValidator(10)]}
              />
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid === true
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={(event) => addNewContact(event)}
              disabled={!formState.isFormValid}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
