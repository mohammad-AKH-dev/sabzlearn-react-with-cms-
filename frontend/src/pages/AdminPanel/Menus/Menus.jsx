import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { minValidator } from "../../../components/validators/rules";
import Input from "../../../components/Form/Input";
import { useForm } from "../../../hooks/useForm";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [menuParent, setMenuParent] = useState("-1");
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const mySwal = withReactContent(Swal)

  useEffect(() => {
    getAndShowAllMenus()
  }, []);

  

  const getAndShowAllMenus = () => {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => setMenus(allMenus));
  }

  const removeMenu = (menuID) => {
     mySwal.fire({
      title:'آیا از حذف این منو اطمینان دارید؟',
      icon:'warning',
      confirmButtonText:'بله',
      cancelButtonText:'خیر',
      showCancelButton:true
     }).then(result => {
      if(result.isConfirmed){
        fetch(`http://localhost:4000/v1/menus/${menuID}`,{
          method:"DELETE",
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` 
          }
         }).then(res => {
          if(res.ok){
            mySwal.fire({
              title:'حذف منو با موفقیت انجام شد',
              icon:'success',
              confirmButtonText:'خیلی هم عالی'
            }).then(() => getAndShowAllMenus())
          }
         })
      }
     })
  }

  const createMenu = (event) => {
    event.preventDefault()
    let newMenuInfos = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent:menuParent === '-1' ? undefined : menuParent
    }
     fetch('http://localhost:4000/v1/menus',{
      method:"POST",
      headers:{
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        "Content-type": 'application/json'
      },
      body: JSON.stringify(newMenuInfos)
     }).then(res => {
        if(res.ok){
          mySwal.fire({
            title:'منوی جدید با موفقیت اضافه شد',
            icon:'success',
            confirmButtonText:'ایول'
          }).then(() => getAndShowAllMenus())
        }
     })
  }

  return (
    <>
        <div className="container">
        <div className="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا عنوان را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <select
                className="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <DataTable title="منوها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu._id}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : (<i className="fa fa-check"></i>)}</td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeMenu(menu._id)}>
                    حذف
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
