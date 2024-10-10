import { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../components/Form/Input";
import { minValidator } from "../../../components/validators/rules";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [allSessions,setAllSessions] = useState([])
  const [sessionCourse, setSessionCourse] = useState('-1');
  const [sessionVideo,setSessionVideo] = useState(null)
  const mySwal = withReactContent(Swal)
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSessions()

    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });
  }, []);

  function formatTime(number) {
    const str = number.toString();
    const hours = str.length === 4 ? str.slice(0, 2) : '0' + str[0];
    const minutes = str.slice(-2);
    return `${hours}:${minutes}`;
}

  const getAllSessions = () => {
    fetch('http://localhost:4000/v1/courses/sessions')
         .then(res => res.json())
         .then(sessions => setAllSessions(sessions))
  }

  const createNewSession = (event) => {
    event.preventDefault()
    let localStorageData = JSON.parse(localStorage.getItem('user'))
    let formData = new FormData()
    formData.append('title',formState.inputs.title.value)
    formData.append('time',formState.inputs.time.value)
    formData.append('video',sessionVideo)
    formData.append('free','1')

    fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${localStorageData.token}` 
      },
      body: formData
    }).then(res => {
      if(res.ok){
        mySwal.fire({
          title:'جلسه جدید با موفقیت افزوده شد',
          icon:'success',
          confirmButtonText:'بسیار هم عالی'
        }).then(() => getAllSessions())
      }else{
        mySwal.fire({
          title:'مشکلی در افزودن جلسه پیش آمد',
          icon:'error',
          confirmButtonText:'ای باباv'
        })
      }
    })
  }

  const removeSession = (sessionID) => {
    mySwal.fire({
      title:'آیا از حذف این جلسه اطمینان دارید؟',
      icon:'warning',
      confirmButtonText:'بله',
      cancelButtonText:'خیر',
      showCancelButton:true
    }).then(result => {
      if(result.isConfirmed){
        fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`,{
          method:"DELETE",
          headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        }).then(res => {
          if(res.ok){
            mySwal.fire({
              title:'جلسه با موفقیت حذف شد',
              icon:'success',
              confirmButtonText:'بسیار هم عالی'
            }).then(() => getAllSessions())
          }
        })
      }
    })
  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">ویدیوی جلسه</label>
                <input type="file" onChange={(event) => setSessionVideo(event.target.files[0])} />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select className="select" onChange={event => setSessionCourse(event.target.value)}>
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>{course.name}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" onClick={(event) => createNewSession(event)} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title={'جلسات'}>
      <table className="table" style={{textAlign:'center'}}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>تایم</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allSessions.length && allSessions.map((session,index) => (
               <tr key={session._id}>
               <td>{index + 1}</td>
               <td>{session.title}</td>
               <td>{formatTime(session.time)}</td>
              <td>{session.course.name}</td>
               <td>
                 <button type="button" className="btn btn-danger delete-btn" onClick={() => removeSession(session._id)}>
                   حذف
                 </button>
               </td>
               
             </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
