export default function Sidebar() {
  return (
    <div className="col-3">
      <div className="sidebar">
        <span className="sidebar__name">محمدامین سعیدی راد</span>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              پیشخوان
            </a>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              سفارش
            </a>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              کیف پول من
            </a>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              جزئیات حساب کاربری
            </a>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              دوره های خریداری شده
            </a>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              تیکت های پشتیبانی
            </a>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
