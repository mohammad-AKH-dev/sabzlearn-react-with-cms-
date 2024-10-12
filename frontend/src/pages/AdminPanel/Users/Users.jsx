import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../Components/Form/Input";
import { requiredValidator, minValidator,maxValidator,emailValidator } from "../../../Components/validators/rules";

export default function Users() {
  const [allUsers,setAllUsers] = useState([])
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const mySwal = withReactContent(Swal)
  
  useEffect(() => {
     getAndShowAllUsers()
  },[])

  const getAndShowAllUsers = () => {
    let adminToken = JSON.parse(localStorage.getItem('user')).token
    fetch('http://localhost:4000/v1/users',{
      method:"GET",
      headers:{
        Authorization: `Bearer ${adminToken}`
      }
    })
         .then(res => res.json())
         .then(users => setAllUsers(users))
  }

  const removeUser = (userID) => {
      let adminToken = JSON.parse(localStorage.getItem('user')).token
      mySwal.fire({
        title:'آیا از حذف اطمینان دارید؟',
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'بله',
        cancelButtonText:'خیر'
      }).then((result) =>{
         if(result.isConfirmed){
          fetch(`http://localhost:4000/v1/users/${userID}`,{
            method:"DELETE",
            headers:{
              Authorization: `Bearer ${adminToken}`
            }
          }).then(res => {
            if(res.ok){
              getAndShowAllUsers()
            }
          })
         }
      })
  }

  const banUser = (userID) => {
    let adminToken = JSON.parse(localStorage.getItem('user')).token
    mySwal.fire({
      title:'آیا از بن کردن این کاربر اطمینان دارید؟',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'بله',
      cancelButtonText:'خیر'
    }).then((result) =>{
       if(result.isConfirmed){
        fetch(`http://localhost:4000/v1/users/ban/${userID}`,{
          method:"PUT",
          headers:{
            Authorization: `Bearer ${adminToken}`
          }
        }).then(res => {
          if(res.ok){
                fetch(`http://localhost:4000/v1/users/${userID}`,{
                  method:"DELETE",
                  headers:{
                    Authorization: `Bearer ${adminToken}`
                  }
                }).then(res => {
                  if(res.ok){
                    getAndShowAllUsers()
                  }
                })
               }
            })
  
        }
      })
    }

    const registerNewUser = (event) => {
      event.preventDefault();
      const newUserInfo = {
        name: `${formState.inputs.name.value}`,
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        phone: formState.inputs.phone.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.password.value,
      };
  
      fetch('http://localhost:4000/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserInfo)
      }).then(res => {
        console.log(res);
        res.json()
      }).then(() => {
        mySwal.fire({
          title:'یوزر جدید با موفقیت اضافه شد',
          confirmButtonText:'ایول',
          icon:'success'
        }).then(() => {
           getAndShowAllUsers()
        })
      })
    };

    const changeRole = (userID) => {
      mySwal.fire({
        title:'نقش جدید را وارد کنید:',
        icon:'info',
        confirmButtonText:'ثبت نقش',
        input:'text'
      }).then(result => {
        if(result.isConfirmed && result.value){
          fetch('http://localhost:4000/v1/users/role',{
            method:"PUT",
            headers:{
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
              "Content-type": 'application/json'
            },
            body: JSON.stringify({
              id:userID,
              role: result.value
            })
          }).then(res => {
            if(res.ok){
              mySwal.fire({
                title:'نقش کاربر با موفقیت تغییر کرد',
                icon:'success',
                confirmButtonText:'خیلی هم عالی'
              }).then(() => getAndShowAllUsers())
            }
          })
        }
      })
    }
  
  return (
    <>
    <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table className="table" style={{textAlign:'center'}}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>رمز عبور</th>
              <th>نقش</th>
              <th>تغییر نقش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length && allUsers.map((user,index) => (
               <tr key={user._id}>
               <td>{index + 1}</td>
               <td>{user.name}</td>
               <td>{user.phone ? user.phone : 'شماره ای موجود نیست'}</td>
               <td>{user.email}</td>
               <td>{user.username}</td>
               <td>
                 {user.role === "ADMIN" ? 'مدیر' : 'کاربر عادی'}
               </td>
               <td>
                 <button type="button" className="btn btn-primary edit-btn" onClick={() => changeRole(user._id)}>
                   تغییر نقش
                 </button>
               </td>
               <td>
                 <button type="button" className="btn btn-danger delete-btn" onClick={() => removeUser(user._id)}>
                   حذف
                 </button>
               </td>
               <td>
                 <button type="button" className="btn btn-danger delete-btn" onClick={() => banUser(user._id)}>
                   بن
                 </button>
               </td>
             </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
