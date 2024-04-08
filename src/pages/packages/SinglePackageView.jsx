import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import SingleView from './SingleView';

export default function SinglePackageView({packages}) {
  const { auth, setAuth } = useAuth();
  
  
  console.log('packages',packages)
  const {_id,image,destination,no_of_days,price,airline_username} = packages
  

  return (
    <div>
<div className="card w-96 glass">
      <figure>
        <img src={image} alt="New York"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title"><span className='text-blue-700 font-bold text-3xl'>{destination} </span></h2>
        <p><span className='text-blue-700 font-bold text-3xl'>No. of Days: {no_of_days} </span></p>
        <p>Price: ${price}</p>
        {packages.hotel.length > 0 && (
          <div>
            <h3>Hotels:</h3>
            <ul>
              {packages.hotel.map((hotel, index) => (
                <li key={index}>{hotel}</li>
              ))}
            </ul>
          </div>
        
        )}
        <p className="description">
          Explore the vibrant streets of {destination} with our {no_of_days}-day package. Experience the rich culture, iconic landmarks, and delicious cuisine. Our package includes comfortable accommodations and exciting activities. Book now and make unforgettable memories!
        </p>
        {/* <p className='text-blue-700 font-bold text-2xl mb-4'>
         Airline: {airline_username}
        </p> */}
        <div className="card-actions justify-end">
        <Link to={`/package/${_id}`} className="btn btn-primary">Learn more</Link>          
        </div>

      </div>
    </div>
      
      
    </div>
  );
}
