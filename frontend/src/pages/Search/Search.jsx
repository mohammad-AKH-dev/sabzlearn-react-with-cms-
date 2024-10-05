import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CourseBox from "../../components/CourseBox/CourseBox";
import ArticleBox from "../../components/ArticleBox/ArticleBox";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allData) => {
        console.log(allData);
        setArticles(allData.allResultArticles);
        setCourses(allData.allResultCourses);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه دوره‌ها برای جستجوی شما"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <div className="alert alert-warning">
                    دوره‌ای برای جستجوی شما وجود ندارد
                  </div>
                ) : (
                  <>
                    {courses.map((course) => (
                      <CourseBox
                        coursePrice={course.price}
                        title={course.name}
                        img={`http://localhost:4000/courses/covers/${course.cover}`}
                        teacher={'محمد امین سعیدی راد'}
                        students={3}
                        href={course.shortName}
                        key={course._id}
                        score={5}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه مقالات برای جستجوی شما"
            desc="پیش به سوی ارتقای دانش"
          />
          <div className="articles__content">
            <div className="row">
              {articles.length === 0 ? (
                <div className="alert alert-warning">
                  مقاله‌ای برای جستجوی شما وجود ندارد
                </div>
              ) : (
                <>
                  {articles.map((article) => (
                    <ArticleBox
                      cover={`http://localhost:4000/courses/covers/${article.cover}`}
                      title={article.title}
                      desc={article.description}
                      shortName={article.shortName}
                      key={article._id}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
