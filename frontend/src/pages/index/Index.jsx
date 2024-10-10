
import LastArticles from '../../components/LastArticles/LastArticles'
import LastCourses from '../../components/LastCourses/LastCourses'
import AboutUs from '../../components/AboutUs/AboutUs'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import PresellCourses from '../../components/PresellCourses/PresellCourses'

import Footer from '../../components/Footer/Footer'

import './index.css'
import Header from '../../components/Header/Header'

export default function Index() {
  return (
    <>
    <Header/>
        <LastCourses/>
        <AboutUs/>
        <PopularCourses/>
        <PresellCourses/>
        <LastArticles/>
        <Footer/>
    </>
  )
}
