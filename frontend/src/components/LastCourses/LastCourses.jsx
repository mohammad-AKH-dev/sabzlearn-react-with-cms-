import { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourses.css";

export default function LastCourses() {
  const [allCourses, setAllCourses] = useState([]);
   

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((courses) => {
        setAllCourses(courses);
      });
  }, []);
  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="/courses/1"
          />
        </div>

        <div className="courses-content">
          <div className="container">
            <div className="row">
              {allCourses.length
                ? [...allCourses]
                    .reverse().splice(0,6)
                    .map((course) => (
                      <CourseBox
                        key={course._id}
                        title={course.name}
                        teacher={course.creator}
                        img={`http://localhost:4000/courses/covers/${course.cover}`}
                        students={course.registers}
                        coursePrice={course.price}
                        score={course.courseAverageScore}
                        href={course.shortName}
                        discount={course.discount}
                      />
                    ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
