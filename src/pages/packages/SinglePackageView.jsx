import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function SinglePackageView() {
  const { auth, setAuth } = useAuth();
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const loadPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/package/${id}`);
        setPackageData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error loading package:", error);
      }
    };

    loadPackage();
  }, [id]); // Include id in the dependency array

  return (
    <div>
      {/* Display package data here */}
      {packageData && (
        <div>
          <h2>Package Details</h2>
          <p>Destination: {packageData.Destination}</p>
          <p>No. of Days: {packageData.No_of_days}</p>
          <p>Price: {packageData.price}</p>
          {/* Add more fields as needed */}
        </div>
      )}
      {!packageData && <p>Loading...</p>}
    </div>
  );
}
