import Index from "./pages/index/Index";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Category from "./pages/Category/Category";
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
import AdminCategory from "./pages/AdminPanel/Categories/Category";
import AdminContacts from "./pages/AdminPanel/Contact/AdminContacts";
import Sessions from "./pages/AdminPanel/Sessions/Sessions";
import Session from "./pages/Session/Session";
import Offs from "./pages/AdminPanel/Offs/Offs";
import Comments from "./pages/AdminPanel/Comments/Comments";
import Draft from "./pages/AdminPanel/Articles/Draft";
import PadminPage from "./pages/AdminPanel/Index/Index";
import Puser from "./pages/UserPanel/Index";
import UserIndex from "./pages/UserPanel/Index/Index";
import Orders from "./pages/UserPanel/Orders/Orders";
import UserCourses from "./pages/UserPanel/Courses/Courses";
import SendTicket from "./pages/UserPanel/Tickets/SendTicket";
import Tickets from "./pages/UserPanel/Tickets/Tickets";
import TicketAnswer from "./pages/UserPanel/Tickets/TicketAnswer";
import EditAccount from "./pages/UserPanel/EditAccount/EditAccount";
import PAdminPrivateRoute from "./components/PrivateRoutes/PAdminPrivateRoute";
import AdminTickets from "./pages/AdminPanel/Tickets/Tickets";
import Discounts from "./pages/AdminPanel/Discounts/Discounts";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },

  {
    path: "/my-account/*",
    element: <Puser />,
    children: [
      { path: "", element: <UserIndex /> },
      { path: "orders", element: <Orders /> },
      { path: "buyed", element: <UserCourses /> },
      { path: "tickets", element: <Tickets /> },
      { path: "tickets/answer/:id", element: <TicketAnswer /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "edit-account", element: <EditAccount /> },
    ],
  },

  {
    path: "/p-admin/*",
    element: 
      <PAdminPrivateRoute>
        <Admin />
      </PAdminPrivateRoute>
    ,
    children: [
      { path: "", element: <PadminPage /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContacts /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
      { path: "tickets",element:<AdminTickets/>},
      { path: "discounts",element:<Discounts/>}
    ],
  },
];

export default routes;
