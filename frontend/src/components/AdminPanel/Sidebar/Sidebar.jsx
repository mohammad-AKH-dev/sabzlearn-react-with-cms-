import './Sidebar.css'
import {Link, NavLink } from 'react-router-dom';

export default function Sidebar() {
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
            <NavLink to="/p-admin/home" >
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
            <NavLink to="/p-admin">
              <span>کدهای تخفیف</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin">
              <span>دسته‌بندی‌ها</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
