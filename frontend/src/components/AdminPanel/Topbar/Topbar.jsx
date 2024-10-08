import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState("");
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowAdminNotifications,setIsShowAdminNotifications] = useState(false)
  

  const seenNotification = useCallback((notificationID) => {
    
      fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`,{
        method:'PUT',
        headers:{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user').token)}`
        }
      }).then(res => res.json())
        .then(notifications => console.log(notifications))
  },[])


  useEffect(() => {
    fetch("http://localhost:4000/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((adminInfos) => {
        setAdminInfo(adminInfos);
        setAdminNotifications(adminInfos.notifications);
      });
  }, [seenNotification]);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="home-header">
          <div className="home-right">
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowAdminNotifications(true)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div className={`home-notification-modal ${isShowAdminNotifications ? 'active-modal-notfication' : ''}`}>
              <ul className="home-notification-modal-list" onMouseLeave={() => setIsShowAdminNotifications(false)}>
                {adminNotifications.length ? (
                  adminNotifications.map((notification) => (
                    <li
                      key={notification._id}
                      className="home-notification-modal-item"
                    >
                      <span className="home-notification-modal-text">
                        {
                          notification
                        }
                        </span>
                      <label className="switch">
                        <a href="javascript:void(0)" onClick={() => seenNotification(notification._id)}>دیدم !</a>
                      </label>
                    </li>
                  ))
                ) : (
                  <div className="alert alert-danger">
                    نوتیفیکیشنی جهت نمایش وجود ندارد
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src="/images/profile.png" alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <Link to={"/p-admin/home"}>{adminInfo.name}</Link>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
