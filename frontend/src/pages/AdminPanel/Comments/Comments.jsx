import  { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Comments() {

    const [comments, setComments] = useState([])
    const mySwal = withReactContent(Swal)

    useEffect(() => {
        getAndShowAllComments()
    }, [])

    const getAndShowAllComments = () => {
      fetch('http://localhost:4000/v1/comments')
            .then(res => res.json())
            .then(allComments => setComments(allComments))
    }

    const showCommentBody = (body) => {
      mySwal.fire({
        title: body,
        confirmButtonText:'اوکی'
      })
    }


    const removeComment = (commentID) => {
      mySwal.fire({
        title:'آیا از حذف این کامنت اطمینان دارید؟',
        icon:'warning',
        confirmButtonText:"بله",
        cancelButtonText:'خیر',
        showCancelButton:true
      }).then(result => {
        if(result.isConfirmed){
          fetch(`http://localhost:4000/v1/comments/${commentID}`,{
            method:'DELETE',
            headers:{
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` 
            }
          }).then(res => {
            if(res.ok){
              mySwal.fire({
                title:'کامنت با موفقیت حذف شد',
                icon:'success',
                confirmButtonText:'ایول'
              }).then(() => getAndShowAllComments())
            }
          })
        }
      })
    }

    const banUser = (userID,commentID) => {
       mySwal.fire({
        title: 'آیا از بن این یوزر اطمینان دارید؟',
        icon:'warning',
        confirmButtonText:'بله',
        cancelButtonText:'خیر',
        showCancelButton:true
       }).then(result => {
        if(result.isConfirmed){
          fetch(`http://localhost:4000/v1/users/ban/${userID}`,{
            method:"PUT",
            headers:{
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
          }).then(res  => {
             if(res.ok){
              fetch(`http://localhost:4000/v1/comments/${commentID}`,{
                method:"DELETE",
                headers:{
                 Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
               }).then(res => {
                if(res.ok){
                  mySwal.fire({
                    title:'یوزر با موفقیت بن شد و کامنت حذف شد',
                    icon:'success',
                    confirmButtonText:'ایول'
                  }).then(() => getAndShowAllComments())
                }
               })
             }
          })
        }
       })
    }

    const answerToComment = (commentID) => {
      mySwal.fire({
        title:'پاسخ:',
        icon:'info',
        input:'text',
        confirmButtonText:'فرستادن پاسخ'
      }).then(result => {
        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`,{
          method:"POST",
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-type": 'application/json'
          },
          body: JSON.stringify(result.value)
        }).then(res => {
          if(res.ok){
            mySwal.fire({
              title:'کامنت با موفقیت پاسخ داده شد',
              icon:'success',
              confirmButtonText:'بسیار هم عالی'
            }).then(() => getAndShowAllComments())
          }
        })
      })
    }
    
    const filterScore = (score) => {
      let mainScore = null
      switch(score){
        case 5 : {
          mainScore = 'عالی'
          break
        }
        case 4 : {
          mainScore = 'خیلی خوب'
          break
        }
        case 3 : {
          mainScore = 'خوب'
          break
        }
        case 2 : {
          mainScore = 'ضعیف'
          break
        }
        case 1 : {
         mainScore = 'بد'
         break
        }
        default:{
          return mainScore = 'خیلی خوب'
        }
      }
      return mainScore
    }

    const acceptComment = (commentID) => {
         mySwal.fire({
          title:"آیا از تایید این کامنت اطمینان دارید؟",
          icon:"question",
          confirmButtonText:'بله',
          cancelButtonText:'خیر',
          showCancelButton: true
         }).then(result => {
          if(result.isConfirmed){
            fetch(`http://localhost:4000/v1/comments/accept/${commentID}`,{
              method:"PUT",
              headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
              }
            }).then(res => {
              if(res.ok){
                 mySwal.fire({
                  title:'کامنت با موفقیت تایید شد',
                  icon:'success',
                  confirmButtonText:"بسیار هم عالی"
                 }).then(() => getAndShowAllComments())
              }
            })
          }
         })
    }

    const rejectComment = (commentID) => {
      mySwal.fire({
        title:"آیا از رد این کامنت اطمینان دارید؟",
        icon:"question",
        confirmButtonText:'بله',
        cancelButtonText:'خیر',
        showCancelButton: true
       }).then(result => {
        if(result.isConfirmed){
          fetch(`http://localhost:4000/v1/comments/reject/${commentID}`,{
            method:"PUT",
            headers:{
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
          }).then(res => {
            if(res.ok){
               mySwal.fire({
                title:'کامنت با موفقیت رد شد',
                icon:'success',
                confirmButtonText:"بسیار هم عالی"
               }).then(() => getAndShowAllComments())
            }
          })
        }
       })
    }

  return (
      <>
        <DataTable title="کامنت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>امتیاز</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>رد</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td style={{textAlign:'center'}}>
                  {filterScore(comment.score)}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>               
                <td>
                  {
                    comment.answer === 1 ? (
                      <button
                      type="button"
                      className="btn btn-success edit-btn"
                    >
                      پاسخ داده شده
                    </button>
                    ) : (
                      <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => answerToComment(comment._id)}
                    >
                      پاسخ  
                    </button>
                    )
                  }
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => acceptComment(comment._id)}
                  >
                    تایید
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => rejectComment(comment._id)}
                  >
                    رد
                  </button>
                </td>
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
                    onClick={() => removeComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => banUser(comment.creator._id,comment._id)}
                  >
                    بن
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
