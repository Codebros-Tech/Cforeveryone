import {Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./views/Users/Dashboard"
import Login from './views/Guest/Login'
import GuestLayout from "./views/Layouts/GuestLayout"
import DefaultLayout from "./views/Layouts/DefaultLayout"
import Codes from "./views/Code/Codes"
import Signup from "./views/Guest/Signup"
import Issues from "./views/Issues/Issues"
import Users from "./views/Users/Users"
import Issue from "./components/Issue"
import Team from "./views/Pages/Team"
import Hero from "./components/Hero"
import About from "./views/Pages/About"
import NotFound from './components/NotFound'
import UserInfo from "./views/Users/UserInfo"
import InfoUpdate from "./views/Users/InfoUpdate"
import AccountInfo from "./views/Users/AccountInfo"
import Features from "./views/Guest/Features"
import Guide from "./views/Pages/Guide"
import AdminLogin from "./views/Guest/AdminLogin"
import Main from './views/Layouts/Main'
import AdminLayout from "./views/Layouts/AdminLayout"
import ForgotPassword from "./views/Guest/ForgotPassword"
import CodeCreate from "./views/Code/CodeCreate"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>

            <Route element={<Main />}>
                <Route path="/" element={<Hero />} />

                <Route path="/features" element={<Features />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="login" element={<AdminLogin />} />
            </Route>

            <Route path="/" element={<DefaultLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/codes/create" element={<CodeCreate />} />
                <Route path="/codes" element={<Codes />} />
                <Route path="/codes/:id" element={<CodeCreate />} />

                <Route path="/issues" element={<Issues />} />
                <Route path="/issues/:id" element={<Issue />} />

                <Route path="/users" element={<Users />} />
                <Route path="/users/:username" element={<AccountInfo />} />

                <Route path="/myinfo" element={<UserInfo />} />
                <Route path="/myinfo/edit" element={<InfoUpdate />} />
                <Route path="/guide" element={<Guide />} />

                <Route path="/team" element={<Team />} />

                <Route path="/*" element={<NotFound />} />
            </Route>

            <Route path="/" element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
        </Route>
    )
);


export default router;
