import 'daisyui';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import React from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../pages/airlines/NavBar';
import axios from '../api/axios';

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


  
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // console.log('auth',auth.roles[0])

  const becomePremium = async () => {
    console.log("becoming premium");
    const response = await axios.post('/payment',{
      username: auth.username,
      purpose: "becoming_premium",
      package_name: '',
      airline_name: '',
      price: '5000',
      seats: '',
      flight_id: ''
    }, {
     headers: {
       Authorization: `Bearer ${auth.accessToken}`
     }
   });

   if (response?.data?.url) {
    window.location.replace(response.data.url);
   }
  }


  const logout = async () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    setAuth({});
    navigate('/login');
  }

  return (
    <>
      <div className="relative navbar  mb-20 bg-base-100 shadow-lg">
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
    <input onChange={handleToggle} type="checkbox" className="toggle theme-controller"/>

  </div>
  <div className="navbar-center hidden lg:flex">

  </div>
  <div className="navbar-end">
  {console.log('autha',auth)}
  {(() => {
  if (auth?.username) {
    if (auth?.roles[0] === 313) {
      
      return (
        <div className='flex space-x-4 justify-center items-center'>
          <NavLink to='_/Dashboard' className={({isActive})=> isActive ? 'text-primary font-extrabold' : 'font-bold'}>Admin Dashboard</NavLink>
          <span className="p-5"><b>Welcome {auth?.username}</b></span>
          <button className="btn" onClick={logout}>Logout</button>
          
          <FontAwesomeIcon icon={faShoppingCart} />

        </div>
      );


    } else if(auth?.roles[0] === 2000){
      
      
      return(
        <NavBar></NavBar>
      )
        


     

    } else {
      // Render components for other authenticated users
      return (
        <div className='space-x-8'>
            <NavLink to='/user/userProfile' className={({isActive}) => isActive ? 'text-primary font-extrabold' : 'font-bold'}>Dashboard</NavLink>
            {auth.type === 'Normal' ? 
              <button className='btn btn-outline btn-info mx-4' onClick={() => becomePremium()}>CLICK TO BECOME PREMIUM USER</button> :
              
              <span className="p-5" style={{ textShadow: '0 0 5px gold' }}><b>Welcome {auth?.username}</b></span>
            }

            <NavLink to='/user/wishlist' className={({isActive}) => isActive ? 'text-primary font-extrabold' : 'font-bold'}>WishList <FontAwesomeIcon icon={faHeart} /></NavLink>

            
            <button className="btn btn-outline btn-info" onClick={logout}>Logout</button>
            <Link to='/user/cart'>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
        </div>

      );
    }
  } else {
    // Render components for unauthenticated users
    return (
      <>
        <NavLink to='/login' className="btn shadow-lg mr-8">Login</NavLink>
        <NavLink to='/signup' className="btn shadow-lg mr-8 font-bold">Signup</NavLink>
        
      </>
    );
  }
})()}

  </div>
</div>
    </>
  )
}
