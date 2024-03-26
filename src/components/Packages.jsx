import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function Packages() {
 const [packageData,setPackageData] = React.useState([])

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await axios.get("http://localhost:3000/package");
        setPackageData(result.data);
        console.log(result.data)
      } catch (error) {
        console.error("Error loading users:");
      }
    };

    loadUsers();
  }, []); 

  return (
    <div className='grid grid-cols-3 m-24 space-x-8'>
     {packageData.map((user,index)=>(
      <div className="card w-96 glass">
      <figure>
        <img src={user.image} alt="New York"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title"><span className='text-blue-700 font-bold text-3xl'>{user.Destination} </span></h2>
        <p><span className='text-blue-700 font-bold text-3xl'>No. of Days: {user.No_of_days} </span></p>
        <p>Price: ${user.price}</p>
        {user.HOTELS.length > 0 && (
          <div>
            <h3>Hotels:</h3>
            <ul>
              {hotels.map((hotel, index) => (
                <li key={index}>{hotel}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="description">
          Explore the vibrant streets of {user.Destination} with our {user.No_of_days}-day package. Experience the rich culture, iconic landmarks, and delicious cuisine. Our package includes comfortable accommodations and exciting activities. Book now and make unforgettable memories!
        </p>
        <p className='text-blue-700 font-bold text-2xl mb-4'>
         Airline: {user.Airlines}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn more!</button>
        </div>
      </div>
    </div>
     ))}
    </div>
  );
}
