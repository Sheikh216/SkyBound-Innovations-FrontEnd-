import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { auth } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Retrieve wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem(`${auth.username}Wishlist`)) || [];
    setWishlist(storedWishlist);
  }, [auth.username]);

  const removeFromWishlist = (index) => {
    // Create a copy of the current wishlist array
    const updatedWishlist = [...wishlist];
    // Remove the package at the specified index
    updatedWishlist.splice(index, 1);
    // Update the state with the modified wishlist
    setWishlist(updatedWishlist);
    // Update localStorage with the modified wishlist
    localStorage.setItem(`${auth.username}Wishlist`, JSON.stringify(updatedWishlist));
  };

  return (
    <div>
      {/* Banner */}
      <div className="p-6 py-12 bg-purple-400 mb-24">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tighter font-bold">Up to<br className="sm:hidden" />10% Off</h2>
            <div className="space-x-2 text-center py-2 lg:py-0">
              <span>Plus free shipping!</span>
              <span className="font-bold text-lg">GET THE CODE FROM THE HOMEPAGE</span>
            </div>
            <Link to='/' href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">SEE COUPONS</Link>
          </div>
        </div>
      </div>
      {/* Banner */}
      <div className="overflow-x-auto mb-96">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Destination</th>
              <th>No. of Days</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Display wishlist items */}
            {wishlist.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.packagename}</td>
                <td>{item.destination}</td>
                <td>{item.no_of_days}</td>
                <td>TK{item.price}</td>
                <td>
                  <button className='btn btn-error' onClick={() => removeFromWishlist(index)}>REMOVE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
