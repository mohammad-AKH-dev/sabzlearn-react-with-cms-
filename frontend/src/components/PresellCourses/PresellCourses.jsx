import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../SectionHeader/SectionHeader";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./PresellCourses.css";
import CourseBox from "../CourseBox/CourseBox";

export default function PresellCourses() {
  const [allCourses, setAllCourses] = useState([]);



  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((courses) => {
        setAllCourses(courses)
      });
  }, []);
  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دوره های پیش فروش"
        />

        <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                modules={[Autoplay]}
                pagination={true}
                slidesPerView={3}
                spaceBetween={20}
                loop
                autoplay
                className="mySwiper"
              >
                {allCourses.length
                  ? allCourses.map((course) => (
                      <SwiperSlide key={course._id}>
                        <CourseBox
                          title={course.name}
                          href={course.shortName}
                          width={"100%"}
                          teacher={course.creator}
                          coursePrice={course.price}
                          score={course.courseAverageScore}
                          img={`http://localhost:4000/courses/covers/${course.cover}`}
                          discount={course.discount}
                        />
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
