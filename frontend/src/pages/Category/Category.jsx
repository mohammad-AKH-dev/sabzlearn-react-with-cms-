import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Category.css";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { Link, useParams } from "react-router-dom";

export default function Category() {
  const [courses, setCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [status, setStatus] = useState("default");
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [searchValue, setSearchValue] = useState("");
  const [coursesDisplayType, setCoursesDisplayType] = useState("row");

  const { categoryName } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
        setOrderedCourses(allCourses);
      });
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = courses.filter((course) => course.price === 0);
        setOrderedCourses(freeCourses);
        break;
      }
      case "money": {
        const notFreeCourses = courses.filter((course) => course.price !== 0);
        setOrderedCourses(notFreeCourses);
        break;
      }
      case "last": {
        setOrderedCourses(courses);
        break;
      }
      case "first": {
        const reversedCourses = courses.slice().reverse();
        setOrderedCourses(reversedCourses);
        break;
      }
      case "cheap": {
        const cheapCourses = [...courses].sort((a, b) => a.price - b.price);
        setOrderedCourses(cheapCourses);
        break;
      }
      case "expensive": {
        const expensiveCourses = [...courses].sort(
          (a, b) => (b.price = a.price)
        );
        setOrderedCourses(expensiveCourses);
        break;
      }
      default: {
        setOrderedCourses(courses);
      }
    }
  }, [status]);

  const statusTitleChangeHandler = (event) => {
    setStatusTitle(event.target.textContent);
  };

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value);
    const filteredCourses = courses.filter((course) =>
      course.name.includes(event.target.value)
    );
    setOrderedCourses(filteredCourses);
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <div className="alert alert-warning">
                    هنوز هیچ دوره‌ای برای این کتگوری وجود ندارد
                  </div>
                ) : (
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div
                          className={`courses-top-bar__row-btn ${
                            coursesDisplayType === "row"
                              ? "courses-top-bar__icon--active"
                              : ""
                          }`}
                          onClick={() => setCoursesDisplayType("row")}
                        >
                          <i className="fas fa-border-all courses-top-bar__icon"></i>
                        </div>
                        <div
                          className={`courses-top-bar__column-btn ${
                            coursesDisplayType === "column"
                              ? "courses-top-bar__icon--active"
                              : ""
                          }`}
                          onClick={() => setCoursesDisplayType("column")}
                        >
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {/* مرتب سازی پیش فرض */}
                            {statusTitle}
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li
                              className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                              onClick={(event) => {
                                setStatus("مرتب سازی پیش فرض");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی پیش فرض
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("free");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی دوره های رایگان
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("money");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی دوره های پولی
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("last");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس آخرین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("first");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس اولین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("cheap");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس ارزان ترین
                            </li>
                            <li
                              className="courses-top-bar__selection-item"
                              onClick={(event) => {
                                setStatus("expensive");
                                statusTitleChangeHandler(event);
                              }}
                            >
                              مرتب سازی بر اساس گران ترین
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
                            value={searchValue}
                            onChange={searchValueChangeHandler}
                          />
                          <i className="fas fa-search courses-top-bar__search-icon"></i>
                        </form>
                      </div>
                    </div>

                    {shownCourses.length === 0 ? (
                      <div className="alert alert-warning">
                        هیچ دوره‌ای برای {statusTitle} وجود ندارد
                      </div>
                    ) : (
                      <>
                        {coursesDisplayType === "row" ? (
                          <>
                            {shownCourses.map((course) => (
                              <CourseBox
                                coursePrice={course.price}
                                title={course.name}
                                img={`http://localhost:4000/courses/covers/${course.cover}`}
                                teacher={course.creator}
                                students={course.registers}
                                href={course.shortName}
                                key={course._id}
                                score={course.courseAverageScore}
                              />
                            ))}
                          </>
                        ) : (
                          <>
                            {shownCourses.map((course) => (
                              <div className="col-12" key={course._id}>
                                <div className="course-box">
                                  <div className="course__box-header">
                                    <div className="course__box-right">
                                      <Link
                                        className="course__box-right-link"
                                        to={`/course-info/${course.shortName}`}
                                      >
                                        <img
                                          src={`http://localhost:4000/courses/covers/${course.cover}`}
                                          className="course__box-right-img"
                                        />
                                      </Link>
                                    </div>
                                    <div className="course__box-left">
                                      <div className="course__box-left-top">
                                        <Link
                                          to={`/course-info/${course.shortName}`}
                                          className="course__box-left-link"
                                        >
                                          {course.name}
                                        </Link>
                                      </div>
                                      <div className="course__box-left-center">
                                        <div className="course__box-left-teacher">
                                          <i className="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                          <span className="course__box-left-name">
                                            محمد امین سعیدی راد
                                          </span>
                                        </div>
                                        <div className="course__box-left-stars">
                                          {Array(5 - course.courseAverageScore)
                                            .fill(0)
                                            .map((_, index) => (
                                              <img
                                                key={index + course.courseAverageScore} // برای جلوگیری از تداخل کلیدها
                                                src="/images/svgs/star.svg"
                                                alt="rating"
                                                className="course-box__star"
                                              />
                                            ))}
                                          {Array(course.courseAverageScore)
                                            .fill(0)
                                            .map((_, index) => (
                                              <img
                                                key={index}
                                                src="/images/svgs/star_fill.svg"
                                                alt="rating"
                                                className="course-box__star"
                                              />
                                            ))}
                                        </div>
                                      </div>
                                      <div className="course__box-left-bottom">
                                        <div className="course__box-left-des">
                                          <p>{course.description}</p>
                                        </div>
                                      </div>
                                      <div className="course__box-footer">
                                        <div className="course__box-footer-right">
                                          <i className="course__box-footer-icon fa fa-users"></i>
                                          <span className="course__box-footer-count">
                                            202
                                          </span>
                                        </div>
                                        <span className="course__box-footer-left">
                                          {course.price === 0
                                            ? "رایگان"
                                            : course.price.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}

                    <Pagination
                      items={orderedCourses}
                      itemsCount={3}
                      pathName={`category-info/${categoryName}`}
                      setShownCourses={setShownCourses}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
