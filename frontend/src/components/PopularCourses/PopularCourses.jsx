import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./PopularCourses.css";
import { useEffect, useState } from "react";

export default function PopularCourses() {
  const [popularCourses,setPopularCourses] = useState([])
  

  useEffect(() => {
     fetch('http://localhost:4000/v1/courses/popular')
         .then(res => res.json())
         .then(courses => setPopularCourses(courses))
  },[])

  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />

        <div className="courses-content">
          <div className="container">
            <div className="row">
            <Swiper
                modules={[Autoplay]}
                pagination={true}
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                autoplay={{
                  delay:3000,
                  disableOnInteraction:false
                }}
                className="mySwiper"
              >
                {popularCourses?.length
                  ? popularCourses?.map((course) => (
                      <SwiperSlide key={course?._id}>
                        <CourseBox
                          title={course?.name}
                          href={course?.shortName}
                          width={"100%"}
                          teacher={course?.creator}
                          coursePrice={course?.price}
                          score={course?.courseAverageScore}
                          img={`http://localhost:4000/courses/covers/${course?.cover}`}
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
