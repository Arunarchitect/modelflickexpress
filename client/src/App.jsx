import Layout from "./components/layout/Layout"
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import Pagenotfound from './pages/Pagenotfound'
import Tools from './pages/Tools'
import Test from "./pages/tools/Test"
import LoginReg from "./pages/auth/LoginReg"
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail"
import Dashboard from "./pages/Dashboard"
import { useSelector } from "react-redux";
import ResetPassword from "./pages/auth/ResetPassword"
import Schedule from "./pages/tools/Schedule"
import Blog from "./pages/Blog"
import Post from "./pages/blog/Post"
import Projects from "./pages/pro/Projects"
import EditPost from "./pages/blog/EditPost"
import Scheduler from "./pages/tools/Scheduler"
import Employee from "./pages/tools/Employee"
import About from "./pages/About"



function App() {
   const { access_token } = useSelector(state => state.auth)
  return (
     <div>
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:blogId" element={<EditPost />} />
            <Route path="/test" element={<Test />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/login" element={!access_token ? <LoginReg /> : <Navigate to='/dashboard' />} />
            <Route path='resetpass' element={<SendPasswordResetEmail />} />
            <Route path='apis/user/reset-password/:id/:token' element={<ResetPassword />} />
            <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/*" element={<Pagenotfound />} />
         </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App
