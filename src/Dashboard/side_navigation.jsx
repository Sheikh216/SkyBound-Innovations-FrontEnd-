import React from 'react';
import { Link } from 'react-router-dom';

function SideNavigation() {
  return (
    <div className="drawer mb-96 flex justify-center mt-56">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button w-56 h-16 text-2xl">Open Dashboard</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className='text-2xl'><Link to='/user'>Profile</Link></li>
          <li className='text-2xl'><Link to='/user/schedule'>Schedule</Link></li>
          <li className='text-2xl'><Link to='/user/ticket'>Ticket</Link></li>
          
        </ul>
      </div>
</div>
  );
}

export default SideNavigation;
