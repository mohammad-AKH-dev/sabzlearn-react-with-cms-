import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseBox from "../../components/CourseBox/CourseBox";
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import "./Courses.css";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

export default function Courses() {
  const [allCourses,setAllCourses] = useState([])
  const [shownCourses,setShownCourses] = useState([])



  useEffect(() => {
    fetch('http://localhost:4000/v1/courses')
         .then(res => res.json())
         .then(courses => setAllCourses(courses))
  },[])


  return (
    <>
     <Topbar/>
     <Navbar/>

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses/",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {allCourses.length ? (
                  <>
                   {shownCourses.map(course => (
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
                   <Pagination
                    items={allCourses}
                    itemsCount={2}
                    pathName={'courses'}
                    setShownCourses={setShownCourses}
                   />
                  </>
                ): null}
              </div>
            </div>
          </div>

         
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <Footer/>
    </>
  );
}
