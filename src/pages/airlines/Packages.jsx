import React, { useState, useEffect } from 'react';

import axios from '../../api/axios.js'
import useAuth from '../../hooks/useAuth';
import Modal from './Modal';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [singlePackages, setSinglePackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const [createToggle, setCreateToggle] = useState(false);


  // FOR FORM INPUTS
  const [formInputs, setFormInputs] = useState({
    packagename: '',
    destination: '',
    no_of_days: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Create flight  
  

  const handleCreateFlight = async (flightId,to,price) => {
    
   
   try {
    
    const response = await axios.post('/airline/flight', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
       flightName: 'BD123',
       from:'Dhaka',
       to: to,
       price:price,
      
      }
    });

  } catch (error) {
    console.error('Error creating flight:', error);
  }

  fetchPackages()

 };
// 
  const handleSubmit = async () => {
    
    console.log('Form submitted:', formInputs);
    console.log('auth',auth)
    try {
     console.log('TEST',formInputs)
     const response = await axios.post('/airline/package', {
       headers: {
         Authorization: `Bearer ${accessToken}`,
         'Content-Type': 'application/json',
         withCredentials: true
       },
       data: {
        packagename: formInputs.packagename,
        destination:formInputs.destination,
        no_of_days: formInputs.no_of_days,
        hotels:[],
        price:formInputs.price,
        image:formInputs.image
       }
     });

   } catch (error) {
     console.error('Error creating packages:', error);
   }

   fetchPackages()

  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get('/airline/package', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data: {
          username: auth.username 
        }
      });
      setPackages(response.data);
      setSinglePackages(response.data[0].packages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleClick = async (package_id) => {
    const packageSelected = singlePackages.find((SinglePackage) => SinglePackage._id === package_id);
    setSelectedPackage(packageSelected); 
  };

  const closeModal = () => {
    setSelectedPackage(null); 
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <div className='flex m-12 justify-center  '>
        <button onClick={() => setCreateToggle(prevState => !prevState)} className='btn btn-primary'>CREATE A NEW PACKAGE</button>
        {
          createToggle ? (
            <section className="p-6 bg-blue-200 rounded-lg m-12 dark:bg-gray-100 dark:text-gray-900">
              <form onSubmit={handleSubmit} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                  <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">Personal Information</p>
                    <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
                  </div>
                  <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="packagename" className="text-sm">PackageName</label>
                      <input
                        id="packagename"
                        type="text"
                        name="packagename"
                        placeholder="PackageName"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formInputs.packagename}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="destination" className="text-sm">Destination</label>
                      <input
                        id="destination"
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formInputs.destination}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="no_of_days" className="text-sm">No. of Days</label>
                      <input
                        id="no_of_days"
                        type="text"
                        name="no_of_days"
                        placeholder="No. of Days"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formInputs.no_of_days}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-full">
                      <label htmlFor="price" className="text-sm">Price</label>
                      <input
                        id="price"
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formInputs.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                      <label htmlFor="image" className="text-sm">Image link</label>
                      <input
                        id="image"
                        type="text"
                        name="image"
                        placeholder="Image link"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formInputs.image}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                </fieldset>
              </form>
              <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </section>
          ) : null
        }
      </div>

      <div className="bg-slate-200 grid grid-cols-1 mb-80">
        <table className="table">
          <thead>
            <tr className=''>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className='text-3xl font-semibold'>Name</th>
              <th className='text-3xl font-semibold'>Destination</th>
              <th className='text-3xl font-semibold'>No. of Days</th>
              <th className='text-3xl font-semibold'>Price</th>
              <th className='text-3xl font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((airline, index) => (
              airline.packages.map((singlePackage, packageIndex) => (
                <tr key={index + '-' + packageIndex}>
                  <td>
                    <label>
                      <img className='h-28 w-24' src={singlePackage.image} alt={singlePackage.packagename}></img>
                    </label>
                  </td>
                  <td>{singlePackage.packagename}</td>
                  <td>{singlePackage.destination}</td>
                  <td>{singlePackage.no_of_days}</td>
                  <td>{singlePackage.price}</td>
                  <td className="space-x-4 ml-5">
                    <button onClick={() => handleClick(singlePackage._id)} className="btn btn-primary">View</button>
                    <button onClick={() => handleDelete(singlePackage._id)} className="btn btn-error">Delete</button>
                    <button className="btn btn-accent">Update</button>
                    <button onClick={() => handleCreateFlight(singlePackage._id,singlePackage.destination,singlePackage.price)} className="btn btn-accent">Create Flight</button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
        {selectedPackage && (
          <Modal SinglePackage={selectedPackage} closeModal={closeModal} />
        )}
      </div>
    </>
  );
}
