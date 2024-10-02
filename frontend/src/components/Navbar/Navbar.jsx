import AuthContext from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((menus) => {
        setAllMenus(menus);
      });
  }, []);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to={"/"} className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>

              {allMenus.map((menu) => (
                <li className="main-header__item" key={menu._id}>
                  <Link
                    to={`/category-info/${menu.href}`}
                    className="main-header__link"
                  >
                    {menu.title}
                  </Link>
                  {menu.submenus.length ? (
                    <>
                      <i className="fas fa-angle-down main-header__link-icon"></i>
                      <ul className="main-header__dropdown">
                        {menu.submenus.map((menu) => (
                          <li
                            className="main-header__dropdown-item"
                            key={menu._id}
                          >
                            <Link
                              to={`${
                                menu.href.includes("/course-info")
                                  ? menu.href
                                  : `/course-info/${menu.href}`
                              }`}
                              className="main-header__dropdown-link"
                            >
                              {menu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            <Link
              to={authContext.isLoggedIn ? "/" : "/login"}
              className="main-header__profile"
            >
              <span className="main-header__profile-text">
                {authContext.isLoggedIn
                  ? authContext.userInfos.name
                  : "ورود | ثبت نام"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
