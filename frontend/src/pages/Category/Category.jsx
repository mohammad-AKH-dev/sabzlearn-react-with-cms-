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
  const [orderedCourses,setOrderedCourses] = useState([])
  const [shownCategories, setShownCategories] = useState([]);
  const [status, setStatus] = useState("default");
  const [statusTitle,setStatusTitle] = useState('مرتب سازی بر اساس پیش فرض')
  const { categoryName } = useParams();
  console.log(categoryName);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((courses) => {
        setCategoryCourses(courses);
        setOrderedCourses(courses)
      });
  }, [categoryName]);


  useEffect(() => {
     switch(status){
      case 'default':{
        setOrderedCourses(categoryCourses)
        setStatusTitle('مرتب سازی بر اساس پیشفرض')
        break
      }
      case 'free':{
         const freeCourses = categoryCourses.filter(course => course.price === 0)
         setOrderedCourses(freeCourses)
         setStatusTitle('مرتب سازی دوره های رایگان')
         break;
      }
      case 'money': {
        const moneyCourses = categoryCourses.filter(course => course.price !== 0)
        setOrderedCourses(moneyCourses)
        setStatusTitle('مرتب سازی دوره های پولی')
        break;
      }
      case 'last' : {
         setOrderedCourses(categoryCourses)
         setStatusTitle('مرتب سازی بر اساس آخرین')
         break;
      }
      case 'first': {
         setOrderedCourses([...categoryCourses].reverse())
         setStatusTitle('مرتب سازی بر اساس اولین')
         break;
      }
      case 'cheap':{
        const cheapCourses = [...categoryCourses].sort((a, b) => a.price - b.price);
        setOrderedCourses(cheapCourses)
        setStatusTitle('مرتب سازی بر اساس ارزان ترین')
        break;
      }
      case 'expensive': {
        const expensiveCourses = [...categoryCourses].sort((a, b) => b.price - a.price)
        setOrderedCourses(expensiveCourses)
        setStatusTitle('مرتب سازی بر اساس گران ترین')
        break;
      }
      default:{
         setOrderedCourses(categoryCourses)
         break;
      }
     }
  },[status])

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
                       {`${statusTitle}`}
                      <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                    </span>
                    <ul className="courses-top-bar__selection-list">
                      <li
                        value={"default"}
                        className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                         onClick={() => setStatus('default')} 
                      >
                        مرتب سازی پیش فرض
                      </li>
                      <li
                        value={"free"}
                        className="courses-top-bar__selection-item"
                         onClick={() => setStatus('free')} 
                      >
                        مربت سازی دوره های رایگان
                      </li>
                      <li className="courses-top-bar__selection-item" onClick={() => setStatus('money')} >
                        مربت سازی دوره های پولی
                      </li>
                      <li className="courses-top-bar__selection-item" onClick={() => setStatus('last')} >
                        مربت سازی بر اساس آخرین
                      </li>
                      <li className="courses-top-bar__selection-item" onClick={() => setStatus('first')} >
                        مربت سازی بر اساس اولین 
                      </li>
                      <li className="courses-top-bar__selection-item" onClick={() => setStatus('cheap')} >
                        مربت سازی بر اساس ارزان ترین 
                      </li>
                      <li className="courses-top-bar__selection-item" onClick={() => setStatus('expensive')} >
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
                  items={orderedCourses}
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
