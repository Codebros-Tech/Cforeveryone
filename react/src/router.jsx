import {Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./views/Users/Dashboard"
import Login from './views/Guest/Login'
import GuestLayout from "./views/Layouts/GuestLayout"
import DefaultLayout from "./views/Layouts/DefaultLayout"
import Signup from "./views/Guest/Signup"
import Users from "./views/Users/Users"
import Team from "./views/Pages/Team"
import Hero from "./components/Hero"
import About from "./views/Pages/About"
import NotFound from './components/NotFound'
import UserInfo from "./views/Users/UserInfo"
import InfoUpdate from "./views/Users/InfoUpdate"
import AccountInfo from "./views/Users/AccountInfo"
import Features from "./views/Guest/Features"
import AdminLogin from "./views/Guest/AdminLogin"
import Main from './views/Layouts/Main'
import AdminLayout from "./views/Layouts/AdminLayout"
import ForgotPassword from "./views/Guest/ForgotPassword"
import CodeCreate from "./views/Code/CodeCreate"
import CodeShow from "./views/Code/CodeShow"
import CodeIndex from "./views/Code/CodeIndex"
import MyCodes from "./views/Code/MyCodes"
import CodeView from './views/Code/CodeView.jsx'
import Contact from "./views/Pages/Contact"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>

            <Route element={<Main />}>
                <Route path="/" element={<Hero />} />

                <Route path="/team" element={<Team />} />
                <Route path="/features" element={<Features />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="login" element={<AdminLogin />} />
            </Route>

            <Route path="/" element={<DefaultLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/codes" element={<CodeIndex />} />
                <Route path="/codes/mine" element={<MyCodes />} />
                <Route path="/codes/create" element={<CodeCreate />} />
                <Route path="/codes/:id/edit" element={<CodeCreate />} />
                <Route path="/codes/:id" element={<CodeShow />} />

                <Route path="/codes/:id/comments" element={<CodeView />} />

                <Route path="/users" element={<Users />} />
                <Route path="/users/:username" element={<AccountInfo />} />

                <Route path="/myinfo" element={<UserInfo />} />
                <Route path="/myinfo/edit" element={<InfoUpdate />} />

                { /* This means that you can only contact us if you are a user of our platform.  */}
                <Route path="/contact" element={<Contact />} />


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
