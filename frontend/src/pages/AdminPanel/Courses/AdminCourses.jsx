import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../Components/Form/Input";
import { requiredValidator,minValidator,maxValidator } from "../../../Components/validators/rules";

import './Courses.css'

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [courseStatus,setCourseStatus] = useState('start')
  const [courseCover,setCourseCover] = useState('')
  const mySwal = withReactContent(Swal);

  const [formState,onInputHandler] = useForm({
    name:{
      value:'',
      isValid:false
    },
    description:{
      value:'',
      isValid:false
    },
    shortName:{
      value:'',
      isValid:false
    },
    price:{
      value:'',
      isValid:false
    },
    support:{
      value:'',
      isValid:false
    }
  },false)

  useEffect(() => {
    getAndShowAllCourses();

    fetch(`http://localhost:4000/v1/category`)
    .then((res) => res.json())
    .then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);

  async function getAndShowAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user")).token;
    const res = await fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    });
    if (res.ok) {
      const result = await res.json();
      setCourses([...result]);
    }
  }

  async function removeCourse(courseID) {
    mySwal
      .fire({
        title: "آیا از حذف اطمینان دارید؟",
        icon: "warning",
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const localStorageData = JSON.parse(
            localStorage.getItem("user")
          ).token;
          const res = await fetch(
            `http://localhost:4000/v1/courses/${courseID}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorageData}`,
              },
            }
          );
          if (res.ok) {
            getAndShowAllCourses();
          }
        }
      });
  }

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCourse = (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('name',formState.inputs.name.value)
    formData.append('description',formState.inputs.description.value)
    formData.append('shortName',formState.inputs.shortName.value)
    formData.append('price',formState.inputs.price.value)
    formData.append('support',formState.inputs.support.value)
    formData.append('status',courseStatus)
    formData.append('cover',courseCover)
    formData.append('categoryID',courseCategory)

    if(courseCategory === '-1'){
      mySwal.fire({
        title:'لطفا دسته بندی دوره را انتخاب کنید',
        icon:'warning',
        confirmButtonText:'اوکی'
      })
    }else{
      fetch('http://localhost:4000/v1/courses',{
        method:"POST",
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` 
        },
        body:formData
      }).then(res => {
        if(res.ok){
            mySwal.fire({
              title:'دوره با موفقیت به سایت اضافه شد',
              icon:'success',
              confirmButtonText:'بسیار هم عالی'
            }).then(result => {
              if(result.isConfirmed){
                getAndShowAllCourses()
              }
            })
        }else{
          mySwal.fire({
            title:'مشکلی در اضافه کردن دوره جدید وجود دارد',
            icon:'error',
            confirmButtonText:'ای بابا'
          })
        }
      })
    }

  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <Input
                  type="text"
                  id='name'
                  validations={[minValidator(5)]}
                  element='input'
                  onInputHandler={onInputHandler}
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                <Input
                  type="text"
                  id='description'
                  validations={[minValidator(5)]}
                  element='input'
                  onInputHandler={onInputHandler}
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">url دوره</label>
                <Input
                  type="text"
                  validations={[minValidator(5)]}
                  onInputHandler={onInputHandler}
                  element='input'
                  id='shortName'
                  placeholder="لطفا url دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <Input
                  type="text"
                  validations={[minValidator(5)]}
                  onInputHandler={onInputHandler}
                  element='input'
                  id='price'
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="support input">
                <label className="input-title">پشتیبانی دوره</label>
                <Input
                  type="text"
                  validations={[minValidator(5)]}
                  onInputHandler={onInputHandler}
                  element='input'
                  id='support'
                  placeholder="لطفا پشتیبانی دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value={'-1'}>لطفا دسته بندی را انتخاب کنید</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input type="file" id="file" onChange={(event) => setCourseCover(event.target.files[0])} />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="avalibe"
                          name="condition"
                          checked={courseStatus === 'start' ? true : false}
                          onClick={() => setCourseStatus('start')}
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="unavailable"
                          name="condition"
                          checked={courseStatus === 'presell' ? true : false}
                          onClick={() => setCourseStatus('presell')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={(event) => addNewCourse(event)} />
                </div>
              </div>
            </div>
            
          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.length
              ? courses.map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>{course.name}</td>
                    <td>
                      {course.price === 0
                        ? "رایگان"
                        : course.price.toLocaleString()}
                    </td>
                    <td>
                      {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                    </td>
                    <td>{course.shortName}</td>
                    <td>{course.creator}</td>
                    <td>{course.categoryID.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                      >
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn"
                        onClick={() => removeCourse(course._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
