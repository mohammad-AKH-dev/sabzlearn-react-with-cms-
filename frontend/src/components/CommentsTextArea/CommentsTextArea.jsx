import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./CommentsTextArea.css";
import { Link, useParams } from "react-router-dom";

export default function CommentsTextArea({ comments , setComments}) {
  const [newComment,setNewComment] = useState('')
  const [score,setScore] = useState(5)
  const authContext = useContext(AuthContext)
  const MySwal = withReactContent(Swal)
  const params = useParams()


  const submitComment = async (e) => {
    e.preventDefault()

     if(newComment.length) {
       let commentDetails = {
         body:newComment,
         courseShortName:params.courseName,
         score
       }

       const res = await fetch('http://localhost:4000/v1/comments',{
         method:'POST',
         headers:{
           Authorization:`Bearer ${authContext.token}`,
           "Content-type": 'application/json'
         },
         body: JSON.stringify(commentDetails)
       })
       console.log(res)
       if(res.ok){
         MySwal.fire({
          title:'کامنت با موفقیت ثبت شد:)',
          icon:'success',
          timer:2000,
          confirmButtonText:'بسیار هم عالی',
         }).then(() => {
          const localStorageData = JSON.parse(localStorage.getItem('user'))
          fetch(`http://localhost:4000/v1/courses/${params.courseName}`, {
            method: "GET",
            Authorization: `Bearer ${localStorageData ? localStorageData.token : null}`,
          })
            .then((res) => res.json())
            .then((courseInfo) => {
              setComments(courseInfo.comments);
            });
         })
       }else{
        MySwal.fire({
          title:'مشکلی در ثبت کامنت پیش آمده',
          icon:'error',
          timer:2000,
          confirmButtonText:'متوجه شدم'
       })
     }
  }
}

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <>
                <div className="comments__item">
                  <div className="comments__question">
                    <div className="comments__question-header">
                      <div className="comments__question-header-right">
                        <span className="comments__question-name comment-name">
                          {comment.creator.name}
                        </span>
                        <span className="comments__question-status comment-status">
                          {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                        </span>
                        <span className="comments__question-date comment-date">
                          {comment.createdAt.slice(0, 10)}
                        </span>
                      </div>
                      <div className="comments__question-header-left">
                        <a
                          className="comments__question-header-link comment-link"
                          href="#"
                        >
                          پاسخ
                        </a>
                      </div>
                    </div>
                    <div className="comments__question-text">
                      <p className="comments__question-paragraph comment-paragraph">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="comments__pagantion">
              <ul className="comments__pagantion-list">
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    <i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    1
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    2
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="comments__pagantion-link comments__pagantion-link--active"
                  >
                    3
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {
        authContext.isLoggedIn ? (
          <>
           <div className="comments__rules">
        <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
          استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
        </span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          دیدگاه های نامرتبط به دوره تایید نخواهد شد.
        </span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
        </span>
        <span className="comments__rules-item">
          <i className="fas fa-check comments__rules-icon"></i>
          از درج دیدگاه های تکراری پرهیز نمایید.
        </span>
      </div>
      <div className="comments__respond">
        <div className="comments__score">
          <span className="comments__score-title">امتیاز شما</span>
          <div className="comments__score-input">
            <span className="comments__score-input-text">
              امتیاز خود را انتخاب کنید
            </span>
            <i className="fas fa-angle-down	 comments__input-icon"></i>
          </div>
        </div>
        <div className="comments__respond-content">
          <div className="comments__respond-title">دیدگاه شما *</div>
          <textarea className="comments__score-input-respond" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
        </div>
        <button type="button" onClick={(e) => submitComment(e)} className="comments__respond-btn">
          ارسال
        </button>
      </div>
          </>
        ) : <div style={{marginTop:'10px'}}>
          <div className="alert alert-danger">برای ثبت کامنت لاگین کنید</div>
          <Link to={'/login'} className="btn btn-primary">رفتن به صفحه ی لاگین</Link>
        </div>
      }
    </div>
  )};
