import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function SingleView({}) {
  const { id } = useParams();
  const {auth} = useAuth();
  const [packageData,setPackageData] = useState('')

  const [from,setFrom] = useState()
  const [airlines,setAirlines] = useState()

  const [flightInfo,setFlightInfo] = useState()

  const [form,setForm] = useState(false)

  const toggleFormVisibility = () => {
    setForm((prevForm) => !prevForm);
  };

  React.useEffect(() => {
    const loadPackage = async () => {
      try {
        const accessToken = auth.accessToken;
        const response = await axios.get(`http://localhost:3001/user/package/${id}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setPackageData(response.data);
        console.log('response_singlePackage',response.data);
        console.log('auth',auth)
      } catch (error) {
        console.error("Error loading package:", error);
      }
    };

    loadPackage();
  }, []); 

  const getAllFlights = async () => {
    try {
      console.log(packageData.destination)
      const accessToken = auth.accessToken;
      const response = await axios.post("http://localhost:3001/user/flight", {
        airlineName: airlines,
        from: from,
        to: packageData.destination 
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("Flights:", response.data);
      setFlightInfo(response.data)
      
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Handle errors or display error messages to the user
    }
  };
  

  // ADD TO CART 
  const addToCart = () => {
    // Check if packageData exists
    if (packageData) {
      // Get existing cart items from localStorage or initialize an empty array
      const existingCartItems = JSON.parse(localStorage.getItem(auth.username)) || [];
      
      // Add the current packageData to cart
      existingCartItems.push({ packageName: packageData.packagename, price: packageData.price,image:packageData.image });
      
      // Update localStorage with the new cart items
      localStorage.setItem(auth.username, JSON.stringify(existingCartItems));
      
      // Optionally, you can display a message to indicate successful addition to cart
      alert('Item added to cart successfully!');
    }
  };


  // ADD TO CART ENDS
 
  return (
<div className="hero min-h-screen" style={{backgroundImage: `url(${packageData.image})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello From <span className='text-blue-500 text-7xl'>{packageData.airline_username}</span></h1>
      <p className="mb-5"><span className='text-red-400 text-3xl'>Package Name : {packageData.packagename}</span></p>
      <p className="mb-5"><span className='text-red-400 text-3xl'>PRICE : {packageData.price}</span></p>
      {/* <p className="mb-5"><span className='text-red-400 text-3xl'>Hotels : {}</span></p> */}
      {/* <Link className="btn btn-primary" onClick={addToCart}>ADD TO CART</Link> */}
      <button className="btn btn-primary" onClick={toggleFormVisibility}>SEE AVAILABLE FLIGHTS </button>
      {form? <div className="join mt-4">
  <div>
  <select className="select select-bordered join-item" onChange={(e) => setFrom(e.target.value)}>
    <option disabled selected>From</option>
    <option>City A</option>
    <option>Dhaka</option>
    
  </select>
  </div>
  <select className="select select-bordered join-item" onChange={(e) => setAirlines(e.target.value)}>
    <option disabled selected>Airlines</option>
    <option>Novo Air</option>
    <option>US Bangla</option>
    <option>Bangldesh Biman</option>
  </select>
  <div className="indicator">
    <span className="indicator-item badge badge-secondary">new</span> 
    <button className="btn join-item" onClick={getAllFlights}>Search</button>
  </div>
</div>: false}

    </div>
  </div>
</div>
  )
}
