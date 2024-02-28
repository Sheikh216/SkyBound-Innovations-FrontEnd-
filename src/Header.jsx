import 'daisyui';
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  return (
    <>
      <div className="relative navbar ml-5 mb-20 bg-base-100 shadow-md">
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
    <Link to='/Login' className="btn shadow-lg mr-8">LOG IN </Link>
  </div>
</div>
    </>
  )
}
