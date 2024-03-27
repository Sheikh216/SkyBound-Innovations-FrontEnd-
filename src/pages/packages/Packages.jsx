import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function Packages() {
 const [packageData,setPackageData] = React.useState([])
 const {auth} = useAuth()
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const accessToken = auth.accessToken;
        const result = await axios.get("http://localhost:3000/package",{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setPackageData(result.data);
        console.log(result.data)
      } catch (error) {
        console.error("Samir Error loading users:");
      }
    };

    loadUsers();
  }, []); 

  return (
    <div className='grid grid-cols-3 m-24 space-x-8'>
     {packageData.map((packages,index)=>(
      <div className="card w-96 glass">
      <figure>
        <img src={packages.image} alt="New York"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title"><span className='text-blue-700 font-bold text-3xl'>{packages.Destination} </span></h2>
        <p><span className='text-blue-700 font-bold text-3xl'>No. of Days: {packages.No_of_days} </span></p>
        <p>Price: ${packages.price}</p>
        {packages.HOTELS.length > 0 && (
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
          Explore the vibrant streets of {packages.Destination} with our {packages.No_of_days}-day package. Experience the rich culture, iconic landmarks, and delicious cuisine. Our package includes comfortable accommodations and exciting activities. Book now and make unforgettable memories!
        </p>
        <p className='text-blue-700 font-bold text-2xl mb-4'>
         Airline: {packages.Airlines}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/package/${packages._id}`} className="btn btn-primary">Learn more</Link>
        </div>

      </div>
    </div>
     ))}
    </div>
  );
}
