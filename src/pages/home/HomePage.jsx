import React, { useEffect, useState } from 'react';
import Packages from '../packages/Packages';
import Images_HomePages from './Images_HomePages';
import Middle_HomePage from './Middle_HomePage';
import useAuth from '../../hooks/useAuth';

export default function HomePage() {
  const {auth} = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [airlines,setAirlines] = useState()
  const [from,setFrom] = useState()
  const [to,setTo] = useState()

  useEffect(() => {
    document.title = "SkyBound";
    // Retrieve existing coupons from local storage
    const existingCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    setCoupons(existingCoupons);
    console.log(existingCoupons)
  }, []);


  const getAllFlights = async () => {
    try {
      
      const accessToken = auth.accessToken;
      const response = await axios.post("http://localhost:3001/user/flight", {
        airlineName: airlines,
        from: from,
        to: to 
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("Flights:", response.data);
      setFlightInfo(response.data)
      setForm(false)
      
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Handle errors or display error messages to the user
    }
  };
  

  return (
    <div>
      <Images_HomePages />

      <div className='flex justify-center space-x-2 relative bottom-7'>
        <select onChange={(e) => setFrom(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option disabled selected>FROM</option>
          <option>Dubai</option>
          <option>Thailand</option>
        </select>
        <select onChange={(e) => setTo(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option disabled selected>Choose your destination</option>
          <option>Dubai</option>
          <option>Thailand</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
          <option onChange={(e) => setAirlines(e.target.value)} disabled selected>Choose your Airlines</option>
          <option>Novo Air</option>
          <option>Bangladesh Biman</option>
          <option>US BANGLA</option>
        </select>
        <button onClick={getAllFlights} className='btn btn-primary'>SEARCH</button>
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
