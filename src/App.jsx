import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
// import SideNavigation from './Dashboard/side_navigation'
// import UserProfile from './Dashboard/UserProfile'
import { useEffect } from 'react'
import RequireAuth from './components/RequireAuth'
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
// import {script} from "./components/Chatbox/chatbox.js"
// import { stepifyScript } from "./components/Chatbox//utils.js";



import MainLayout from './pages/MainLayout.jsx'
import UserProfile from './Dashboard/UserProfile.jsx'
import SideNavigation from './Dashboard/side_navigation.jsx'
import Allusers from './pages/admin/Allusers.jsx'
import SinglePackageView from './pages/packages/SinglePackageView.jsx'

const ROLES = {
  "Admin": 313,
  "User": 1000,
  "Airline": 2000
}


function App() {
  useEffect(() => {
    document.title = "My Page";
    document.querySelector('html').setAttribute('data-theme', "light");
  }, []);

  return (
    <Routes>
      {/* <Route path='/package/:id' element={<SinglePackageView/>}></Route> */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path='package/:id' element={<SinglePackageView/>}/>
            
        

        <Route path="user" element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route index element={<UserDashboard />} />
            <Route path='userProfile' element={<SideNavigation />} />
            
            
        </Route>

        
      
        <Route path="_" element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route index element={<AdminDashboard />} />
          <Route path='allusers' element={<Allusers />} />
          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
