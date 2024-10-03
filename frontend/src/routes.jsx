import Index from "./pages/index/Index";
import Courseinfo from './pages/Courseinfo/Courseinfo'
import Category from './pages/Category/Category'
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const routes = [
    {path: '/', element:<Index/>},
    {path:'/course-info/:courseName',element:<Courseinfo/>},
    {path:'/category-info/:categoryName/:page',element:<Category/>},
    {path:'/article-info/:articleName',element:<ArticleInfo/>},
    {path:'/courses/:page',element:<Courses/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    
]

export default routes