import {Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./views/Dashboard"
import Login from './views/Login'
import GuestLayout from "./components/GuestLayout"
import DefaultLayout from "./components/DefaultLayout"
import Codes from "./views/Codes"
import Signup from "./views/Signup"
import Issues from "./views/Issues"
import Users from "./views/Users"
import Code from "./components/Code"
import Issue from "./components/Issue"
import Team from "./views/Team"
import Hero from "./components/Hero"
import About from "./views/About"
import NotFound from './components/NotFound'
import UserInfo from "./views/UserInfo"
import InfoUpdate from "./views/InfoUpdate"
import AccountInfo from "./views/AccountInfo"
import Features from "./views/Features"
import Guide from "./views/Guide"
import AdminLogin from "./views/AdminLogin"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Hero />} />

            <Route path="/admin" element={<GuestLayout />}>
                <Route path="login" element={<AdminLogin />} />
            </Route>

            <Route path="/" element={<DefaultLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/codes" element={<Codes />} />
                <Route path="/codes/create" element={<Codes />} />
                <Route path="/codes/:id" element={<Code />} />
                <Route path="/codes/:id/edit" element={<Codes />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/issues/:id" element={<Issue />} />

                <Route path="/users" element={<Users />} />
                <Route path="/users/:username" element={<AccountInfo />} />

                <Route path="/team" element={<Team />} />

                <Route path="/hero" element={<Hero />} />

                <Route path="/features" element={<Features />} />

                <Route path="/guide" element={<Guide />} />

                <Route path="/myinfo" element={<UserInfo />} />
                <Route path="/myinfo/edit" element={<InfoUpdate />} />

                <Route path="/*" element={<NotFound />} />
            </Route>

            <Route path="/" element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
            </Route>
        </Route>
    )
);


export default router;
