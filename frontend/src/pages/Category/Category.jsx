import "./Category.css";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Category() {
  const [categoryCourses,setCategoryCourses] = useState([])
  const [category,setCategory] = useState('')
  let params = useParams()

  useEffect(() => {
     setCategory(params.categoryName)
  },[params.categoryName])
  

  useEffect(() => {
     fetch(`http://localhost:4000/v1/courses/category/${category}`)
     .then(res => res.json())
     .then(courses => {
      setCategoryCourses(courses)
     })
  },[category])

  return (
    <>
    <Topbar/>
    <Navbar/>
      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div className="courses-top-bar__column-btn">
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  مرتب سازی پیش فرض
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                    مرتب سازی پیش فرض
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس محبوبیت
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس امتیاز
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس آخرین
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>

          <div className="courses-content">
            <div className="container">
              <div className="row">
               {categoryCourses.length ? [...categoryCourses].reverse().map(course => (
                 <CourseBox
                 key={course._id}
                 title={course.name}
                 teacher={course.creator}
                 img={`http://localhost:4000/courses/covers/${course.cover}`}
                 students={course.registers}
                 coursePrice={course.price}
                 score={course.courseAverageScore}
                 href={course.shortName}
               />
               )):<div className="alert alert-danger">دوره ای برای این دسته بندی وجود ندارد</div>}
              </div>
            </div>
          </div>

          <Pagination />

        </div>
      </section>
      <Footer/>
    </>
  );
}
