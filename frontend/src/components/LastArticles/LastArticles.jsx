import ArticleBox from '../ArticleBox/ArticleBox';
import SectionHeader from '../SectionHeader/SectionHeader'

import "./LastArticles.css";

export default function LastArticles() {
  return (
    <section className="articles">
      <div className="container">

          <SectionHeader
            title="جدیدترین مقاله ها"
            desc="پیش به سوی ارتقای دانش"
            btnTitle="تمامی مقاله ها"
          />
            
            <div className="articles-content">
              <div className="row">
                 <ArticleBox cover={'images/blog/3.jpg'}/>
                 <ArticleBox cover={'images/blog/3.jpg'}/>
                 <ArticleBox cover={'images/blog/3.jpg'}/>
              </div>
            </div>
      </div>
    </section>
  );
}
