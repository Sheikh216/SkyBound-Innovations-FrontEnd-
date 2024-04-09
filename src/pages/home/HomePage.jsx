import React, { useEffect, useState } from 'react';
import Packages from '../packages/Packages';
import Images_HomePages from './Images_HomePages';
import Middle_HomePage from './Middle_HomePage';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

export default function HomePage() {
  const {auth} = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [airlines,setAirlines] = useState()
  const [from,setFrom] = useState()
  const [to,setTo] = useState()
  const [selectedFlight, setSelectedFlight] = useState([]);

  const [searchedFlights,setSearchedFlights] = useState([])

  useEffect(() => {
    document.title = "SkyBound";
    // Retrieve existing coupons from local storage
    const existingCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    setCoupons(existingCoupons);
    console.log(existingCoupons)
  }, []);


  const getAllFlights = async () => {
    try {
      console.log('airlines',airlines)
      const accessToken = auth.accessToken;
      const response = await axios.post("/user/flight", {
        airlineName: airlines,
        from: from,
        to: to 
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("Flights:", response.data);
      setSearchedFlights(response.data)
      // setFlightInfo(response.data)
      // setForm(false)
      
    } catch (error) {
      setSearchedFlights([])
      console.error("Error fetching flights:", error);
      // Handle errors or display error messages to the user
    }
  };
  

  return (
    <div>
      <Images_HomePages />
      {console.log('searched',searchedFlights)}

      {searchedFlights? <div className='flex justify-center space-x-2 relative bottom-7'>
        <select onChange={(e) => setFrom(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option disabled selected>FROM</option>
          <option>Dhaka</option>
          <option>Thailand</option>
          <option>Coxs Bazar</option>
        </select>
        <select onChange={(e) => setTo(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option disabled selected>Choose your destination</option>
          <option>Nepal</option>
          <option>Thailand</option>
          <option>Dhaka</option>
        </select>
        <select onChange={(e) => setAirlines(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option  disabled selected>Choose your Airlines</option>
          <option>Novo Air</option>
          <option>Bangladesh Biman</option>
          <option>US BANGLA</option>
        </select>
        <button onClick={getAllFlights} className='btn btn-primary'>SEARCH</button>
      </div>:null}
      {/* Searched Results */}
      <div className="flex justify-center grid grid-cols-1 m-12   gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchedFlights.map((flight, index) => (
            <div key={index} className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img src="https://www.boeing.com/content/theboeingcompany/us/en/commercial/787/by-design/_jcr_content/root/container/container_1585087907_534282968/tabs/item_1/image.coreimg.jpeg/1709318878474/dreamliner-advantages-787-8-2024.jpeg" alt="Flight" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{flight.flightName}</h2>
                <div className='flex'>
                  <p className='font-bold'>From: {flight.from}</p>
                  <p className='font-bold'>To: {flight.to}</p>
                </div>
                <div className='flex mb-8'>
                  <p className='font-bold'>Price: {flight.price}</p>
                  <p className='font-bold'> Time: {flight.time}</p>
                </div>





                <div className="card-actions justify-end">
                <button onClick={() => window.location.href='#packages'} className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
{/* Searched Results ends */}
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


      <div id="packages">
        <Packages />
      </div>
    </div>
  );
}
