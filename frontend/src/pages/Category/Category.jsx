import "./Category.css";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Category() {
  const [categoryCourses, setCategoryCourses] = useState([]);
  const [shownCategories , setShownCategories] = useState([])
  const {categoryName} = useParams()
  console.log(categoryName)

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((courses) => {
        setCategoryCourses(courses);
      });
  }, [categoryName]);

  return (
    <>
      <Topbar />
      <Navbar />
      <section className="courses">
        <div className="container">
          

          {categoryCourses.length ? (
            <>
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
                  {[...shownCategories].reverse().map((course) => (
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
                  ))}
                </div>
              </div>
              <Pagination 
               items={categoryCourses}
               itemsCount={3}
               pathName={`category-info/${categoryName}`}
               setShownCourses={setShownCategories}
              />
            </div>
            </>
          ) : (
            <div className="alert alert-danger">
              دوره ای برای این دسته بندی وجود ندارد
            </div>
          )}

        </div>
      </section>
      <Footer />
    </>
  );
}
