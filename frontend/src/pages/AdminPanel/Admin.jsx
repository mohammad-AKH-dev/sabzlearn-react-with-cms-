import { Outlet } from "react-router-dom";
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../components/AdminPanel/Topbar/Topbar";

import './index.css'

export default function Admin() {
  return (
    <>
      <div id="content">
          <Sidebar />

          <div id="home" className="col-10">
            <Topbar/>
          </div>
      </div>
      <Outlet />
    </>
  );
}
