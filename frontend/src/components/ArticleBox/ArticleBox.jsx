

import { Link } from "react-router-dom";
import "./ArticleBox.css";

export default function ArticleBox({ title, desc, cover , shortName}) {
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${shortName}`} className="article-card__link-img">
            <img
              src={cover}
              className="article-card__img"
              alt="Article Cover"
              style={{width:'100%'}}
            />
          </Link>
        </div>
        <div className="article-card__content">
          <Link to={`/article-info/${shortName}`} className="article-card__link">
            {title}
          </Link>
          <p className="article-card__text">
            {desc}  
          </p>
          <Link to={`/article-info/${shortName}`} className="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
