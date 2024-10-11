import './Sidebar.css'
import {Link , NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/authContext';
import { useContext } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Sidebar() {
   const authContext = useContext(AuthContext)
   const navigate = useNavigate()
   const mySwal = withReactContent(Swal)

  const logOutUser = (event) => {
    event.preventDefault()
    mySwal.fire({
      title:'آیا از لاگ اوت اطمینان دارید؟',
      confirmButtonText:'بله',
      showCancelButton: true,
      cancelButtonText:'خیر',
      icon:'warning'
    }).then(result => {
      if(result.isConfirmed){
        authContext.logout()
        navigate('/')
      }
    })
    
  }
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/p-admin/" >
              <span>صفحه اصلی</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/courses">
              <span>دوره ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/menus">
              <span>منو ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/articles">
              <span>مقاله ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/users">
              <span>کاربران</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/offs">
              <span>کدهای تخفیف</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/category">
              <span>دسته‌بندی‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/contacts">
              <span>پیغام ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/comments">
              <span>کامنت ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/sessions">
              <span>جلسات</span>
            </NavLink>
          </li>
          <li>
            <Link  onClick={(event) => logOutUser(event)}>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
