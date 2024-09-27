import Landing from '../../components/Landing/Landing'
import LastArticles from '../../components/LastArticles/LastArticles'
import LastCourses from '../../components/LastCourses/LastCourses'
import AboutUs from '../../components/AboutUs/AboutUs'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import PresellCourses from '../../components/PresellCourses/PresellCourses'
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import './index.css'

export default function Index() {
  return (
    <>
    <Topbar/>
    <Navbar/>
      <Landing/>
        <LastCourses/>
        <AboutUs/>
        <PopularCourses/>
        <PresellCourses/>
        <LastArticles/>
        <Footer/>
    </>
  )
}
