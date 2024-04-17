import React, { useState, useEffect } from 'react';

import axios from '../../api/axios.js'
import useAuth from '../../hooks/useAuth';
import Modal from './Modal';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [flights, setFlights] = useState([]);
  const [singlePackages, setSinglePackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const [createToggle, setCreateToggle] = useState(false);
  const [createFlightToggle, setCreateFlightToggle] = useState(false);


  // FOR FORM INPUTS
  const [formInputs, setFormInputs] = useState({
    packagename: '',
    destination: '',
    no_of_days: '',
    price: '',
    image: ''
  });


  const [formFlightInputs, setFormFlightInputs] = useState({
    flightname: '',
    from: '',
    time: '',

  });

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFormFlightInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Create flight  
  

  const handleSubmitFlight = async () => {
    
   
   try {
    console.log('required',formFlightInputs,flightFormState)
    const response = await axios.post('/airline/flight',{
       flightName: formFlightInputs.flightName,
       from:formFlightInputs.from,
       to: flightFormState.to,
       price:flightFormState.price,
       time:formFlightInputs.time,
       packageId:flightFormState.id
    }, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    });
    setFlightFormState({
      createFlightToggle:false
    })

  } catch (error) {
    console.error('Error creating flight:', error);
  }
  fetchFlights()

  fetchPackages()

 };
 const [flightFormState, setFlightFormState] = useState({
  createFlightToggle: false,
  to: '',
  price: '',
  id:''
});

 const handleCreateFlight = (to,price,id) => {
  console.log('BUTTON IS CLICKED',to,price,id)
  setFlightFormState({
    
    createFlightToggle: true,
    to: to,
    price: price,
    id:id
  });
};
{flightFormState.createFlightToggle}
// 
  const handleSubmit = async () => {
    
    console.log('Form submitted:', formInputs);
    console.log('auth',auth)
    try {
     console.log('TEST',formInputs)
     const response = await axios.post('/airline/package',{
        packagename: formInputs.packagename,
        destination:formInputs.destination,
        no_of_days: formInputs.no_of_days,
        hotel:'Sayeman',
        price:formInputs.price,
        image:formInputs.image
      }
      ,{
       headers: {
         Authorization: `Bearer ${auth.accessToken}`,
         'Content-Type': 'application/json',
         
       }
     });

   } catch (error) {
     console.error('Error creating packages:', error);
   }

   fetchPackages()
   setCreateToggle(false)

  };


  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete('/airline/package', {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          id: userId
        }
      });
      fetchPackages();
    } catch(err) {
      console.log(err);
    }
  }

  const handleFlightDelete = async (flightId) => {
    try {
      console.log(flightId)
      const response = await axios.delete('/airline/flight', {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          id: flightId
        }
      });
      fetchFlights();
    } catch(err) {
      console.log(err);
    }
  }


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
      setFlights(response.data);
      
      
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
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
    fetchFlights()
  }, []);

  return (
    <>
      <div className='flex m-12 justify-center  '>
        {!createToggle ?<button onClick={() => setCreateToggle(prevState => !prevState)} className='btn btn-primary'>CREATE A NEW PACKAGE</button>:null}
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
                      <label htmlFor="packagename" className="text-sm">PackageID</label>
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
                      <label htmlFor="no_of_days" className="text-sm">No of Days</label>
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


        {/* create flight form */}
        {
          flightFormState.createFlightToggle ? (
            <section className="p-6 bg-blue-200 rounded-lg m-12 dark:bg-gray-100 dark:text-gray-900">
              <form onSubmit={handleSubmit} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                  <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">Personal Information</p>
                    <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
                  </div>
                  <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="flightName" className="text-sm">Flight Name</label>
                      <input
                        id="flightName"
                        type="text"
                        name="flightName" // corrected name attribute
                        placeholder="flightName"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formFlightInputs.flightName} // corrected value reference
                        onChange={handleFlightChange}
                      />

                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="from" className="text-sm">FROM</label>
                      <input
                        id="from"
                        type="text"
                        name="from"
                        placeholder="Desfromtination"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formFlightInputs.from}
                        onChange={handleFlightChange}
                      />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                      <label htmlFor="time" className="text-sm">Time</label>
                      <input
                        id="time"
                        type="text"
                        name="time"
                        placeholder="time"
                        className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                        value={formFlightInputs.time}
                        onChange={handleFlightChange}
                      />
                    </div>
                    
                    
                  </div>

                </fieldset>
              </form>
              <button onClick={handleSubmitFlight} type="submit" className="btn btn-primary">Submit</button>
            </section>
          ) : null
        }


        {/* create flight form ends */}
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
              <th className='text-3xl font-semibold'>PackageID</th>
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
                  <td>{singlePackage._id}</td>
                  <td>{singlePackage.destination}</td>
                  <td>{singlePackage.no_of_days}</td>
                  <td>{singlePackage.price}</td>
                  <td className="space-x-4 ml-5">
                    <button onClick={() => handleClick(singlePackage._id)} className="btn btn-primary">View</button>
                    <button onClick={() => handleDelete(singlePackage._id)} className="btn btn-error">Delete</button>
                    <button className="btn btn-accent">Update</button>
                    <button onClick={() => handleCreateFlight(singlePackage.destination, singlePackage.price,singlePackage._id)}   className="btn btn-accent">Create Flight</button>
                    {/* onClick={() => handleCreateFlight(singlePackage._id,singlePackage.destination,singlePackage.price)} */}
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

      <div className="bg-slate-200 grid grid-cols-1">
    <h2 className="text-3xl font-semibold underline">Flights</h2>
    <table className="table">
      <thead>
        <tr className=''>
          <th className='text-2xl font-semibold'>Package ID</th>
          <th className='text-2xl font-semibold'>Flight Name</th>
          <th className='text-2xl font-semibold'>From</th>
          <th className='text-2xl font-semibold'>To</th>
          <th className='text-2xl font-semibold'>Price</th>
          <th className='text-2xl font-semibold'>ACTION</th>


        </tr>
      </thead>
      <tbody>
      {flights.map((airline, index) => (
          airline.flights.map((singlePackage, packageIndex) => (

              <tr>
              
                <td>{singlePackage.packageId}</td>
                <td>{singlePackage.flightName}</td>
                <td>{singlePackage.from}</td>
                <td>{singlePackage.to}</td>
                <td>{singlePackage.price}</td>
                <td className='space-x-6'>
                  <button onClick={() => handleFlightDelete(singlePackage._id)}  className='btn btn-error'>DELETE</button>
                  <button className='btn btn-accent'>UPDATE</button>
                </td>
              </tr>
            )
          ))
        )}
      </tbody>
    </table>
  </div>
      

    </>
  );
}
