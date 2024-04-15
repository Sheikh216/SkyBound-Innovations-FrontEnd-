import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import QRCode from 'qrcode.react';
import axios from '../api/axios';

export default function QR() {
  const [packagesPageURL, setPackagesPageURL] = useState('');

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/airline/flight', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data: {
          username: auth.username 
        }
      });
      console.log('flight response',response.data)
      setPackagesPageURL(response.data);
      
      
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };
  
  useEffect(() => {
    // Fetch packages from the backend
    fetchFlights()
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Scan QR Code to View Packages</h2>
      {packagesPageURL && <QRCode value={packagesPageURL} size={200} />}
    </div>
  );
}
