import { useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import "./CourseBox.css";

export default function CourseBox({
  title,
  img,
  teacher,
  coursePrice,
  students,
  score,
  href,
  discount,
  width
}) {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImgLoaded = () => setIsImgShow(true);
  const onImageError = () => {};

  return (
    <div className='col-4' style={{width:width}}>
      <div className="course-box" style={{position:'relative'}}>
        {
          discount !== 0 && coursePrice !== 0  ? (
            <div className="badge bg-success" style={{position:'absolute', left:'0', rotate:'-30deg', zIndex:'999', top:'5px', padding:'5px', paddingRight:'10px',paddingLeft:'10px'}}>{discount}%</div>
          ) : null
        }
        <Link to={`/course-info/${href}`}>
          <img
            src={img}
            alt="Course img"
            className="course-box__img"
            onLoad={onImgLoaded}
            onError={onImageError}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link to={`/course-info/${href}`} className="course-box__title">
            {title}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">
                {teacher}
              </a>
            </div>
            <div className="course-box__rating">

              {Array(5 - score)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index + score} // برای جلوگیری از تداخل کلیدها
                    src="/images/svgs/star.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
              {Array(score)
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

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{students}</span>
            </div>
            <span className="course-box__price">
              {coursePrice === 0 ? "رایگان" : discount ? (coursePrice - (coursePrice * discount / 100)).toLocaleString() : coursePrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={`/course-info/${href}`} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
