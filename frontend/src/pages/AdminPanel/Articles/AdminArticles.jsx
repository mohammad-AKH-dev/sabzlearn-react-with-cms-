import { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function Articles() {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/v1/articles')
      .then(res => res.json())
      .then(allArticles => {
        console.log(allArticles);
        setArticles(allArticles)
      })
  }, [])

  return (
    <>
      <DataTable title="مقاله‌ها"
      >
         <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
