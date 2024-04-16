import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function SingleView({}) {
  const { id } = useParams();
  const {auth} = useAuth();
  const [packageData,setPackageData] = useState('')

  const [showToast, setShowToast] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [from,setFrom] = useState()
  const [airlines,setAirlines] = useState()

  const [flightInfo,setFlightInfo] = useState('')

  const [form,setForm] = useState(false)

  const [selectedSeats, setSelectedSeats] = useState([]);

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

  const calculateTotalPrice = () => {
    // Calculate the total price based on the selected seats
    console.log(selectedSeats.length)
    console.log(selectedSeats)
    const totalPrice = selectedSeats.length * parseFloat(packageData.price);
    setTotalPrice(totalPrice);
  };

  

  const applyCoupon = () => {
    // const couponInput = document.getElementById("couponInput");
    // const couponCode = couponInput.value;
    // // Apply coupon code and reduce total price by 10% if the correct coupon is provided
    // if (couponCode === 'YOUR_COUPON_CODE') {
    //   const discountedPrice = totalPrice * 0.9; // Apply 10% discount
    //   setTotalPrice(discountedPrice);
    // } else {
    //   // Handle incorrect coupon code
    //   <div className="toast toast-top toast-start">
    //     <div className="alert alert-info">
    //       <span>New mail arrived.</span>
    //     </div>
    //     <div className="alert alert-success">
    //       <span>Message sent successfully.</span>
    //     </div>
    //   </div>
    // }

    // NEW STARTS
    const couponInput = document.getElementById("couponInput");
    const couponCode = couponInput.value;
  
    // Retrieve existing coupons from local storage
    const existingCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
  
    // Check if the provided coupon code exists in the localStorage
    const couponExists = existingCoupons.some(coupon => coupon.couponCode === couponCode);
  
    if (couponExists) {
      // Apply coupon code and reduce total price by 10% if the correct coupon is provided
      
        const discountedPrice = totalPrice * 0.9; // Apply 10% discount
        setTotalPrice(discountedPrice);
      
        // Handle incorrect coupon code

    } else {
      // Handle coupon not found in localStorage
      console.error("Coupon not found.");
      // Show toast or error message to the user
    }


    // NEW ENDS
  };


  function handleAdd(event) {
    const seat = event.target.innerText;
    const seatPrice = parseFloat(packageData.price);
    // Check if the seat is already selected
    const type_of_user = auth.type
    console.log(type_of_user)


    if (selectedSeats.includes(seat)) {
      // Remove the seat from the selectedSeats array
      
      setSelectedSeats(prevSeats => prevSeats.filter(prevSeat => prevSeat !== seat));
      
      // Remove background color
      event.target.classList.remove('bg-blue-500');

      setTotalPrice(prevPrice => prevPrice - seatPrice);

      
    } else {

      if (type_of_user === 'Normal' && (seat === 'A1' || seat === 'B1')) {
        // Display an alert or handle the restriction accordingly
        alert('You cannot buy Window seats as a Normal user from the website');
        return; // Exit the function without adding the seat
      }
  
      // Add the seat to the selectedSeats array
      setSelectedSeats(prevSeats => [...prevSeats, seat]);
      
      // Toggle background color
      event.target.classList.add('bg-blue-500');

      setTotalPrice(prevPrice => prevPrice + seatPrice);
      
    }

    // calculateTotalPrice();
  
    
  }
  

  const getAllFlights = async () => {
    try {
      console.log(packageData.destination)
      const accessToken = auth.accessToken;
      const response = await axios.post("/user/flight", {
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
      setForm(false)
      
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Handle errors or display error messages to the user
    }
  };

  const toggleToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide the toast after 5 seconds
  };
  

  // ADD TO CART 
  const addToCart = async() => {

    // NEW

    if (!packageData) {
      alert('Package data is not available. Please try again later.');
      return;
  }



  const totalPriceInCart = parseFloat(totalPrice);
  const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

  let isItemInCart = false;
  for (const item of existingCartItems) {
      if (item.packageName === packageData.packagename) {
          isItemInCart = true;
          break;
      }
  }

  if (isItemInCart) {
      alert('This item is already in your cart.');

      return;
  }

  existingCartItems.push({ username: auth.username, airlines: airlines, packageName: packageData.packagename, price: totalPrice, image: packageData.image, seats: selectedSeats, flight_id: flightInfo[0]._id });
  localStorage.setItem('cart', JSON.stringify(existingCartItems));

  toggleToast();
  


    // NEW ENDS
   
    // if (!packageData) {
      
    //   alert('Package data is not available. Please try again later.');
    //   return;
    // }
  
  
    // const totalPriceInCart = parseFloat(totalPrice);
  
    
    // const existingCartItems = JSON.parse(localStorage.getItem(auth.username)) || [];
    
   
    // existingCartItems.push({ packageName: packageData.packagename, price: totalPrice, image: packageData.image,seats:selectedSeats,flight_id:flightInfo._id });
    
    
    // localStorage.setItem(auth.username, JSON.stringify(existingCartItems));
    
    
    // alert('Item added to cart successfully!');
// for updating seats 
  //   const data = {
  //     flightId: flightInfo._id,
  //     selectedSeats: selectedSeats
  //   };
  //   try {
  //     const response = await axios.put("http://localhost:3001/user/flight", data, {
  //         headers: {
  //             Authorization: `Bearer ${auth.accessToken}`
  //         }
  //     });
  //     console.log("Flight seats updated:", response.data);
  //     alert('Item added to cart successfully!');
  // } catch (error) {
  //     console.error("Error updating flight seats:", error);
  //     alert('Failed to update flight seats. Please try again later.');
  // }

  };
  

  // ADD TO CART ENDS
 
  return (
<div className="hero min-h-screen" style={{backgroundImage: `url(${packageData.image})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello</h1>
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
{ flightInfo.length>0?
<div className="grid grid-rows-5 space-y-4 mt-24">


            <div className="flex justify-between space-x-12">
              <button>A</button>
              
              {flightInfo[0].seat['A1'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>A1</button>:<button className="btn w-24" onClick={handleAdd}>A1</button>}
              {/* {flightInfo.seat['A1'].length>0? <button className="btn w-24 disabled:" onClick={handleAdd}>A1</button>:<button className="btn w-24" onClick={handleAdd}>A1</button>} */}
              {flightInfo[0].seat['A2'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>A2</button>:<button className="btn w-24" onClick={handleAdd}>A2</button>}
              {flightInfo[0].seat['A3'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>A3</button>:<button className="btn w-24" onClick={handleAdd}>A3</button>}
              {flightInfo[0].seat['A4'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>A4</button>:<button className="btn w-24" onClick={handleAdd}>A4</button>}
              {flightInfo[0].seat['A5'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>A5</button>:<button className="btn w-24" onClick={handleAdd}>A5</button>}
            </div>

            <div className="flex justify-between">
              <button>B</button>
              {flightInfo[0].seat['B1'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>B1</button>:<button className="btn w-24" onClick={handleAdd}>B1</button>}
              {flightInfo[0].seat['B2'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>B2</button>:<button className="btn w-24" onClick={handleAdd}>B2</button>}
              {flightInfo[0].seat['B3'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>B3</button>:<button className="btn w-24" onClick={handleAdd}>B3</button>}
              {flightInfo[0].seat['B4'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>B4</button>:<button className="btn w-24" onClick={handleAdd}>B4</button>}
              {flightInfo[0].seat['B5'].length>0?<button  disabled={true} className="btn w-24 disabled:" onClick={handleAdd}>B5</button>:<button className="btn w-24" onClick={handleAdd}>B5</button>}
            </div>

            {/* <div className="flex justify-between">
              <button>C</button>
              <button className="btn w-24">C1</button>
              <button className="btn w-24">C2</button>
              <button className="btn w-24">C3</button>
              <button className="btn w-24">C4</button>
            </div>

            <div className="flex justify-between">
              <button>A</button>
              <button className="btn w-24">A1</button>
              <button className="btn w-24">A2</button>
              <button className="btn w-24">A3</button>
              <button className="btn w-24">A4</button>
            </div>

            <div className="flex justify-between">
              <button>A</button>
              <button className="btn w-24">A1</button>
              <button className="btn w-24">A2</button>
              <button className="btn w-24">A3</button>
              <button className="btn w-24">A4</button>
            </div> */}
          </div>:null
}

          
          {/* <div className="">
            <div>
              <h1>
                <h1 className="text-2xl">Select your seat</h1>
                <hr className="my-4  border-t border-black border-dotted"/>
              </h1>
            </div>
            <div className="mt-12 bg-white rounded p-4">
              <div id="apnd" className="grid grid-cols-3 flex items-center">
                <h1>Seat <span id="seat-selected" className="btn bg-lime-300">0</span></h1>
                <h1>class</h1>
                <h1>Price</h1>
              </div>
              <hr className="my-4  border-t border-black border-dotted"/>
              
              <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                  <h1>Total price</h1>
                  <h1 >BDT <span id="n-grand">0</span>  </h1>
                </div>
                <div id="discount" className="flex justify-between">

                </div>

                <div className="mt-4" id="app" >
                  <input type="text" placeholder="Any coupon?" id="inp" className="input input-bordered w-full max-w-xs" />
                  <button onclick="coupon()" id="btn-1" className="btn" disabled>APPLY</button>
                </div>
                <div className="flex justify-between mt-4">
                  <h1 >Grand Total</h1>
                  <h1>BDT <span id="grand">0</span> </h1>
                </div>

              </div>
            </div>
            </div> */}

            {/* starts */}
            {flightInfo?
            <div className="right-section  w-96">
        <div>
          <h1>
            <h1 className="text-2xl">Selected seats</h1>
            <hr className="my-4 border-t border-black border-dotted" />
          </h1>
        </div>
        <div className="mt-12 bg-white rounded p-4 bg-slate-800">
          {selectedSeats.map((seat, index) => (
            <div key={index} className="grid grid-cols-3 flex items-center">
              <h1>Seat <span className="btn bg-lime-300">{seat}</span></h1>
              <h1 className='text-blue-400'>{seat=='A1' || seat =='B1'? 'Class: Premium' : 'Class: Economy'}</h1>
              <h1 className='text-blue-400'>Price: {packageData.price}</h1>
            </div>
          ))}
        </div>
        <div className="mt-4 flex space-x-4" id="app ">
          <input type="text" placeholder="Enter coupon code" id="couponInput" className="input input-bordered w-full max-w-xs" />
          <button onClick={applyCoupon} className="btn">APPLY</button>
        </div>
        <div className="text-2xl">
            <h1 className="text-2xl">Total Price: {totalPrice}</h1>
        </div>

        <div>
        <button className="btn btn-primary" onClick={addToCart}>ADD TO CART</button>
        </div>
      </div>:null
            }
            {showToast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-info">
            <span>Item added to Cart.</span>
          </div>
        </div>
      )}
            {/* ends */}

    </div>
  </div>
  {/* SEAT  */}

  


  {/* SEAT */}
</div>
  )
}
