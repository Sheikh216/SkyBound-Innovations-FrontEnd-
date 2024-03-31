import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

import SinglePackageView from './SinglePackageView.jsx';

export default function Packages() {
 const [packageData,setPackageData] = React.useState([])
 const {auth} = useAuth()
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const accessToken = auth.accessToken;
        const result = await axios.get("http://localhost:3001/user/package",{
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

    {packageData.map(Singlepackage => (
        <SinglePackageView packages={Singlepackage} key={Singlepackage._id}  />
     ))}
    
    </div>
  );
}
