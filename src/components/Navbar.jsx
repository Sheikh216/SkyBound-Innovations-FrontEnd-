import 'daisyui';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import React from 'react';
export default function Header() {

  const [theme,setTheme] = React.useState('light')
  const handleToggle = (e) =>{
    if(e.target.checked){
      setTheme('synthwave')
    }else{
      setTheme('light')
    }
  }

  useEffect(()=>{
    localStorage.setItem('theme',theme)
    const localtheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme',localtheme)
  },[theme])



  console.log(theme)
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();


  const logout = async () => {
    setAuth({});
    navigate('/login');
  }

  return (
    <>
      <div className="relative navbar ml-5 mb-20 bg-base-100 shadow-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Book</a></li>
        <li>
          <a>Experience</a>
          <ul className="p-2">
            <li><a>Local Flights </a></li>
            <li><a>International Flights</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost text-2xl text-blue-500">SkyBound-Innovations</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Book</a></li>
      <li>
        <details>
          <summary>Experience</summary>
          <ul className="p-2">
            <li><a>Local Flights</a></li>
            <li><a>International Flights</a></li>
          </ul>
        </details>
      </li>
      <li><a>Help</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    {(() => {
      if (auth?.username ) {
        return (
          <>
          <NavLink to='/user/userProfile' className={({isActive})=> isActive? 'text-primary font-extrabold': 'font-bold'}>Dashboard</NavLink>
          <span className="p-5"><b>Welcome {auth?.username}</b></span>
          <button className="btn" onClick={logout}>Logout</button>
          </>
        )
      } else {
        return (
        <>
          <NavLink to='/login' className="btn shadow-lg mr-8">Login</NavLink>
          <NavLink to='/signup' className="btn shadow-lg mr-8 font-bold">Signup</NavLink>
          <input onChange={handleToggle} type="checkbox"  className="toggle theme-controller"/>
        </>
        )
      }

    }) ()}
  </div>
</div>
    </>
  )
}
