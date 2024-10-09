import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import './Courses.css'

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const mySwal = withReactContent(Swal);

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

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام محصول</label>
                <input
                  type="text"
                  
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت محصول</label>
                <input
                  type="text"
                  
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">تعداد محصول</label>
                <input
                  type="text"
                  
                  placeholder="لطفا تعداد محصول را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت محصول</label>
                <input
                  type="text"
                  
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس محصول</label>
                <input type="file" id="file" />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">موجودی</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>موجود</span>
                        <input
                          type="radio"
                          value="avalibe"
                          name="condition"
                          checked
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="unavailable"
                          name="condition"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="presell">
                <label className="input-title">وضعیت دوره</label>
                <div className="radios">
                  <div className="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        checked
                      />
                    </label>
                  </div>
                  <div className="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="onperforming" name="presell" />
                    </label>
                  </div>
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
