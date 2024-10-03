import { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref={'/articles/1'}
        />

        <div className="articles-content">
          <div className="row">
            {articles.length
              ? [...articles]
                  .reverse()
                  .splice(0, 3)
                  .map((article) => (
                    <ArticleBox
                      key={article._id}
                      title={article.title}
                      desc={article.body}
                      cover={`http://localhost:4000/courses/covers/${article.cover}`}
                      shortName={article.shortName}
                    />
                  ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
