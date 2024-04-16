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

import { GoogleOAuthProvider } from '@react-oauth/google'

// import {script} from "./components/Chatbox/chatbox.js"
// import { stepifyScript } from "./components/Chatbox//utils.js";



import MainLayout from './pages/MainLayout.jsx'
import UserProfile from './Dashboard/UserProfile.jsx'
import SideNavigation from './Dashboard/side_navigation.jsx'
import Allusers from './pages/admin/Allusers.jsx'
import SinglePackageView from './pages/packages/SinglePackageView.jsx'
import AllAirlines from './pages/admin/AllAirlines.jsx'
import SingleView from './pages/packages/SingleView.jsx'
import Cart from './pages/user/Cart.jsx'
import AllCoupons from './pages/admin/AllCoupons.jsx'
import AirlinesDashboard from './pages/airlines/AirlinesDashboard.jsx'
import Packages from './pages/airlines/Packages.jsx'
import Wishlist from './pages/user/Wishlist.jsx'
import Weather from './pages/airlines/Weather.jsx'
import PersistLogin from './components/PersistLogin.jsx'
import Success from './pages/PaymentSuccess.jsx'

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
        <Route element={<PersistLogin />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path='package/:id' element={<SingleView/>} />
              <Route path="/success" element={<Success />} />
                
            

              <Route path="user" element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                  <Route index element={<UserDashboard />} />
                  <Route path='userProfile' element={<SideNavigation />} />
                  <Route path='cart' element={<Cart />} />
                  <Route path='wishlist' element={<Wishlist />} />
              </Route>

              <Route path="_" element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='Dashboard' element={<AdminDashboard />} />
                <Route path='allusers' element={<Allusers />} />
                <Route path='allAirlines' element={<AllAirlines />} />
                <Route path='allCoupons' element={<AllCoupons />} />
              </Route>

              <Route path="airline" element={<RequireAuth allowedRoles={[ROLES.Airline]} />}>
                <Route path='dashboard' element={<AirlinesDashboard />} />
                <Route path='packages' element={<Packages />} />
                <Route path='weather' element={<Weather />} />
              </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
