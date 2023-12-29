import { Navigate, createBrowserRouter } from "react-router-dom"
import Dashboard from "./views/Dashboard"
import Login from './views/Login'
import NotFound from "./views/NotFound"
import GuestLayout from "./components/GuestLayout"
import DefaultLayout from "./components/DefaultLayout"
import Codes from "./views/Codes"
import Signup from "./views/Signup"
import Issues from "./views/Issues"
import People from "./views/People"
import Code from "./components/Code"
import Issue from "./components/Issue"

const router =  createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate  to='/' />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/codes',
                element: <Codes />
            },
            {
                path: '/codes/create',
                element: <Codes />
            },
            {
                path: '/codes/:id',
                element: <Code />
            },
            {
                path: '/codes/:id/edit',
                element: <Code />
            },
            {
                path: '/issues',
                element: <Issues />
            },
            {
                path: '/issues/:id',
                element: <Issue />
            },
            {
                path: '/people',
                element: <People />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/*',
        element: <NotFound />
    },
])

export default router;
