//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import HomePage from './HomePage.jsx'
import './LogIn.jsx'
import LogIn from './LogIn.jsx'
import Signup from './Signup.jsx'
import SideNavigation from './Dashboard/side_navigation.jsx'
import UserProfile from './Dashboard/UserProfile.jsx'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      


      <Router>
        <Header/>

        <Routes>
          <Route exact path = "/" element={<HomePage></HomePage>}></Route>
          <Route exact path = "/Login" element={<LogIn></LogIn>}></Route>
          <Route exact path = "/Signup" element={<Signup></Signup>}></Route>
          <Route exact path = "/dashboard" element={<SideNavigation></SideNavigation>}></Route>
          <Route exact path = "/user/profile" element={<UserProfile></UserProfile>}></Route>

        </Routes>
        <Footer></Footer>
      </Router>

    </>
  )
}

export default App
