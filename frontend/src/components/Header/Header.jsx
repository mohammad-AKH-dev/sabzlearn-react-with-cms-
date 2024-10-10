import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";
import Landing from "../Landing/Landing";

import "./Header.css";
import { useEffect, useState } from "react";


export default function Header() {
  const [indexInfo,setIndexInfo] = useState({})

  useEffect(() => {
    fetch('http://localhost:4000/v1/infos/index')
        .then(res => res.json())
        .then(infos => {
          console.log(infos)
          setIndexInfo(infos)
        })
  },[])
   

  return (
    <header className="header">
        <Topbar/>
        <Navbar />
        <Landing usersCount={indexInfo.usersCount} totalCount={indexInfo.totalTime} coursesCount={indexInfo.coursesCount} />
    </header>
  );
}
