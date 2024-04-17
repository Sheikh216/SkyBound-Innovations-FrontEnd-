import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
// import useAuth from '../hooks/useAuth';
import useAuth from '../../hooks/useAuth';

import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem('auth');
    setAuth({});
    navigate('/login');
  }
 return (
  <div className="navbar bg-base-100">
  <div className="flex-1">
    
  </div>
  <div className="flex-none">
  <div>
        <NavLink to='/airline/dashboard' className={({isActive}) => isActive ? 'text-primary font-extrabold' : 'font-bold'}>Airlines Dashboard</NavLink>
        </div>

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.freepik.com/free-vector/flying-aircraft-icon-isolated-vector_24911-114304.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1713225600&semt=sph" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

    
        <button className="btn btn-error" onClick={logout}>Logout</button>
      </ul>
    </div>
  </div>
</div>
)
}
