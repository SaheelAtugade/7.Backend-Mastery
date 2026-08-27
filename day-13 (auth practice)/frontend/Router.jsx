import { createBrowserRouter } from "react-router-dom";
import Layout from "./src/Layout";
import Home from './src/pages/Home'
import Profile from "./src/pages/Profile";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";

const Router = createBrowserRouter([{
    path:'/',
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: '/profile',
            element: <Profile/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: 'register',
            element: <Register/>,
        }
    ]
}])

export default Router;