import { Link, useParams } from "react-router-dom";
import "./Pagination.css";
import { useEffect, useState } from "react";

export default function Pagination({
  items,
  itemsCount,
  pathName,
  setShownCourses,
}) {
  const [pageCount, setPageCount] = useState(null);

  const { page } = useParams();
  useEffect(() => {
    let endIndex = page * itemsCount ? itemsCount : items.length;
    let startIndex = endIndex - itemsCount;
    let paginatedCourses = [...items].slice(startIndex, endIndex);
    setShownCourses(paginatedCourses);
    let pagesNumber = Math.ceil(items.length / itemsCount);
    setPageCount(pagesNumber);
  }, [page,items]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </a>
        </li>
        {Array(pageCount)
          .fill(0)
          .map((_, index) => (
            <li key={_} className='courses__pagination-item'>
              <Link
                to={`/${pathName}/${index + 1}`}
                className={`courses__pagination-link ${page == (index + 1) ? 'courses__pagination-link--active' : ''}`}
              >
                {index + 1}
              </Link>
            </li>
          ))}

        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
