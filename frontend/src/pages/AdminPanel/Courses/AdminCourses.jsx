import { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);

  async function getAndShowAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user")).token;
    const res = await fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    });
    if (res.ok) {
      const result = await res.json();
      result.map(course => {
        console.log(course)
      })
      setCourses([...result])
    }
  }

  useEffect(() => {
    getAndShowAllCourses();
  }, []);

  return (
    <>
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
            {courses.length ?
              courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>
                    {course.price === 0
                      ? "رایگان"
                      : course.price.toLocaleString()}
                  </td>
                  <td>
                    {course.isComplete === 0
                      ? "در حال برگزاری"
                      : "تکمیل شده"}
                  </td>
                  <td>{course.shortName}</td>
                  <td>{course.creator}</td>
                  <td>{course.categoryID.name}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn">
                      حذف
                    </button>
                  </td>
                </tr>
              )) : null}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
