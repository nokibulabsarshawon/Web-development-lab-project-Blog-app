import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import Login from './Components/Pages/Auth/Login/Login.jsx';
import Register from './Components/Pages/Auth/Register/Register.jsx';
import DashboardLayout from './Layout/DashboardLayout.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRouter from './Provider/PrivateRoute.jsx';
import Dashboard from './Components/Pages/Dashboard/Dashboard.jsx';
import AdminDashboard from './Components/Pages/Dashboard/AdminDashboard.jsx';
import UserDashboard from './Components/Pages/Dashboard/UserDashboard.jsx';
import BlogDetails from './Components/Pages/Blogs/BlogDetails.jsx';
import AddBlogs from './Components/Pages/Blogs/AddBlogs.jsx';
import UpdateBlog from './Components/Pages/Blogs/UpdateBlog.jsx';
import AllBlogs from './Components/Pages/Blogs/AllBlogs.jsx';
import ContactPage from './Components/Pages/Blogs/ContactPage.jsx';
import AboutPage from './Components/Pages/Blogs/AboutPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path:'/BlogDetails/:id',
        element:<BlogDetails></BlogDetails>
      },
      {
        path:'/AllBlogs',
        element:<AllBlogs></AllBlogs>
      },
      {
        path:'/ContactPage',
        element:<ContactPage></ContactPage>
      },
      {
        path:'/AboutPage',
        element:<AboutPage></AboutPage>
      }
    ]
  },
  {
    path: '/dashboard',
    element:(
      <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>
    ),
    children:[
      {
        index:true,
        element:<Dashboard></Dashboard>
      },
      {
        path:'admin',
        element:<AdminDashboard></AdminDashboard>
      },
      {
        path:'user',
        element:<UserDashboard></UserDashboard>
      },
      {
        path:'AddBlogs',
        element:<AddBlogs></AddBlogs>
      },
      {
        path:'UpdateBlog/:id',
        element:<UpdateBlog></UpdateBlog>
      }
    ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
