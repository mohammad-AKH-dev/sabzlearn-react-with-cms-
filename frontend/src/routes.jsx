import Index from "./pages/index/Index";
import Courseinfo from './pages/Courseinfo/Courseinfo'
import Category from './pages/Category/Category'
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";
import Admin from "./pages/AdminPanel/Admin";
import AdminArticles from "./pages/AdminPanel/Articles/AdminArticles";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/AdminCourses";
import Menus from "./pages/AdminPanel/Menus/Menus";

const routes = [
    {path: '/', element:<Index/>},
    {path:'/course-info/:courseName',element:<Courseinfo/>},
    {path:'/category-info/:categoryName/:page',element:<Category/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    {path:'/courses/:page',element:<Courses/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/articles/:page',element:<Articles/>},
    {path:'/contact',element:<Contact/>},
    {path:'/search/:value', element:<Search/>},
    {path:'/p-admin/*',element:<Admin/>,children:[
      {path:'home',element:<Admin/>},
      {path:'articles',element:<AdminArticles/>},
      {path:'users',element:<Users/>},
      {path:'courses',element:<AdminCourses/>},
      {path:'menus',element:<Menus/>}
    ]}
]

export default routes