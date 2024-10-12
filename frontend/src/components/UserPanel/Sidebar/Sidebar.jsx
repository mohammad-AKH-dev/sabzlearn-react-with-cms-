import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const authContext = useContext(AuthContext)
  const mySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const logout = () => {
    mySwal.fire({
      title:'آیا از خروج اطمینان دارید؟',
      icon:'warning',
      confirmButtonText:'بله',
      cancelButtonText:'خیر',
      showCancelButton:true
    }).then(result => {
      if(result.isConfirmed){
        authContext.logout()
        navigate('/')
      }
    })
  }

  return (
    <div className="col-3">
      <div className="sidebar">
        <span className="sidebar__name">محمدامین سعیدی راد</span>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to={''}>
              پیشخوان
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to='orders'>
              سفارش
            </Link>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              کیف پول من
            </a>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="edit-account">
              جزئیات حساب کاربری
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to={'buyed'}>
              دوره های خریداری شده
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to={'tickets'}>
              تیکت های پشتیبانی
            </Link>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" style={{cursor:'pointer'}} onClick={() => logout()}>
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
