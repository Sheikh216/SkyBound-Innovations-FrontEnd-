import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import SingleView from './SingleView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function SinglePackageView({packages}) {
  const { auth, setAuth } = useAuth();
  
  
  console.log('packages',packages)
  const {_id,image,destination,no_of_days,price,airline_username} = packages
  
  const handleAddToWishlist = () => {
    
    let wishlist = JSON.parse(localStorage.getItem(`${auth.username}Wishlist`)) || [];
    
    const isPackageInWishlist = wishlist.find(item => item._id === _id);
    if (!isPackageInWishlist) {
      
      wishlist = [...wishlist, packages];
      
      localStorage.setItem(`${auth.username}Wishlist`, JSON.stringify(wishlist));
     
      alert('Package added to wishlist!');
    } else {
      
      alert('Package is already in wishlist!');
    }
  };


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
          <div className='flex space-x-2'>
            <h3>Hotels:</h3>
            <ul className='font-bold'>
              {packages.hotel.map((hotel, index) => (
                <li key={index}>{hotel}</li>
              ))}
            </ul>
          </div>
        
        )}
        <p className="description">
          Explore the vibrant streets of <span className='font-bold'>{destination}</span> with our <span className='font-bold'>{no_of_days}</span>-day package. Experience the rich culture, iconic landmarks, and delicious cuisine. Our package includes comfortable accommodations and exciting activities. Book now and make unforgettable memories!
        </p>
        {/* <p className='text-blue-700 font-bold text-2xl mb-4'>
         Airline: {airline_username}
        </p> */}
        
        <div className="card-actions justify-around mt-4">
        <button className='btn btn-error' onClick={handleAddToWishlist}>ADD TO WISHLIST
        <FontAwesomeIcon icon={faHeart} />
        </button>
        
        <Link to={`/package/${_id}`} className="btn btn-primary">Learn more</Link>          
        </div>

      </div>
    </div>
      
      
    </div>
  );
}
