import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import {
  minValidator,
  maxValidator,
} from "../../../Components/validators/rules";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";

import "./Category.css";
import withReactContent from "sweetalert2-react-content";

export default function Category() {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [categories, setCategories] = useState([]);
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories);
        setCategories(allCategories);
      });
  }

  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        mySwal
          .fire({
            title: "دسته بندی مورد نظر با موفقیت اضافه شد",
            icon: "success",
            confirmButtonText: "اوکی",
          })
          .then(() => {
            getAllCategories();
          });
      });
  };

  const removeCategory = (categoryID) => {
    mySwal
      .fire({
        title: "آیا از حذف این دسته بندی اطمینان دارید؟",
        icon: "warning",
        confirmButtonText: "بله",
        showCancelButton: true,
        cancelButtonText: "خیر",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:4000/v1/category/${categoryID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }).then((res) => {
            if (res.ok) {
              mySwal
                .fire({
                  title: "دسته بندی مورد نظر با موفقیت حذف شد",
                  icon: "success",
                  confirmButtonText: "ایول",
                })
                .then((result) => {
                  getAllCategories();
                });
            }
          });
        }
      });
  };

  const editCategory = (categoryId) => {
    mySwal.fire({
      title: "اطلاعات جدید را وارد کنید",
      showCancelButton:true,
      cancelButtonText:'کنسل',
      confirmButtonText: "ثبت اطلاعات",
      html: `
         <input id="swal-input1" class="swal2-input"  placeholder="اسم کتگوری جدید" >
         <input id="swal-input2" class="swal2-input"  placeholder="دسته بندی جدید" >
       `,
       preConfirm:() => {
        const input1 = document.getElementById('swal-input1').value;
        const input2 = document.getElementById('swal-input2').value;

        if (!input1 || !input2) {
          Swal.showValidationMessage('لطفاً هر دو اینپوت را پر کنید.');
        }
        return {input1,input2}
       }
    }).then(result => {
      console.log(result)
      fetch(`http://localhost:4000/v1/category/${categoryId}`,{
        method:"PUT",
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
          "Content-type":'application/json'
        },
        body:JSON.stringify({
          title:result.value.input1,
          name:result.value.input2
        })
      }).then(res => {
        if(res.ok){
          return res.json()
        }else{
          mySwal.fire({
            title:'مشکلی پیش آمده',
            confirmButtonText:'ای بابا'
          })
        }
      }).then(() => getAllCategories())
    })
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دسته‌بندی‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => editCategory(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCategory(category._id)}
                  >
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
