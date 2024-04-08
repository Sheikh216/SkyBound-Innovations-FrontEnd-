import React, { useEffect, useState } from 'react';
import Packages from '../packages/Packages';
import Images_HomePages from './Images_HomePages';
import Middle_HomePage from './Middle_HomePage';

export default function HomePage() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    document.title = "SkyBound";
    // Retrieve existing coupons from local storage
    const existingCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    setCoupons(existingCoupons);
    console.log(existingCoupons)
  }, []);
  

  return (
    <div>
      <Images_HomePages />

      <div className='flex justify-center space-x-2 relative bottom-7'>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>Choose your destination</option>
          <option>Dubai</option>
          <option>Thailand</option>
        </select>
        <label className="flex justify-center w- form-control w-full max-w-xs">
          <input type="text" placeholder="Departure Airport" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="flex justify-center w- form-control w-full max-w-xs">
          <input type="text" placeholder="Arrival Airport" className="input input-bordered w-full max-w-xs" />
        </label>
      </div>

      <Middle_HomePage />

      {/* Display coupons if they exist */}
      {coupons.length > 0 && (
  <div className='flex justify-center space-y-20 m-12'>
    <img src='https://png.pngtree.com/png-vector/20230330/ourmid/pngtree-coupon-ticket-logo-vector-design-png-image_6674736.png' alt="coupon logo" />
    <ul className='m-12 space-y-12'>
      {coupons.map((coupon, index) => (
        <li className='text-3xl text-blue-400 flex flex-col' key={index}>
          <span className='text-red-400'>Coupon Code: {coupon.couponCode}</span><br></br>
          <span className='text-blue-400'> What For: {coupon.whatFor}</span>
        </li>
      ))}
    </ul>
  </div>
)}


      <Packages/>
    </div>
  );
}
