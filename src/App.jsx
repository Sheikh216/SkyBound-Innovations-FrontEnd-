//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import './LogIn.jsx'
import LogIn from './LogIn.jsx'
import Signup from './Signup.jsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from './Header.jsx'


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      


      <Router>
        <Header/>

        <Routes>
          <Route exact path = "/Login" element={<LogIn></LogIn>}></Route>
          <Route exact path = "/Signup" element={<Signup></Signup>}></Route>

        </Routes>
      </Router>

    </>
  )
}

export default App
