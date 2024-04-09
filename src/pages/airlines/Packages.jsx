import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import Modal from './Modal';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [singlePackages, setSinglePackages] = useState([]);
  const [selectedPackage,setSelectedPackage] = useState()
  const [loading, setLoading] = useState(true);
  const {auth} = useAuth();
  const accessToken = auth.accessToken;
  const [createToggle,setCreateToogle] = useState(false)

  const fetchPackages = async () => {
   try {
     const response = await axios.get('http://localhost:3001/airline/package', {
       headers: {
         Authorization: `Bearer ${accessToken}`
       },
       data: {
         username: auth.username // Include username in the request body
       }
     });
     setPackages(response.data);
     console.log('RESPONSE',response.data[0].packages)
     setSinglePackages(response.data[0].packages)
     setLoading(false);
     
   } catch (error) {
     console.error('Error fetching packages:', error);
   }
 };

 const handleClick = async (package_id) => {
  const packageSelected = singlePackages.find( (SinglePackage) => SinglePackage._id === package_id );
  setSelectedPackage(packageSelected); // Set the selected user
};

const closeModal = () => {
 console.log('SETTING NULL')
 setSelectedPackage(null); // Close the modal by resetting selectedUser state
};


  useEffect(() => {
   
 
   fetchPackages();
 }, []);
 

  return (
   <>
   <div className='flex m-12 justify-center  '>
   {console.log('toggle',createToggle)}
   <button onClick={() => setCreateToogle(prevState => !prevState)} className='btn btn-primary'>CREATE A NEW PACKAGE</button>
   {
    createToggle?<section className="p-6 bg-blue-200 rounded-lg m-12 dark:bg-gray-100 dark:text-gray-900">
	<form noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Personal Inormation</p>
				<p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="firstname" className="text-sm">PackageName</label>
					<input id="firstname" type="text" placeholder="PackageName" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="lastname" className="text-sm">destination</label>
					<input id="lastname" type="text" placeholder="destination" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="no_of_days" className="text-sm">no_of_days</label>
					<input id="no_of_days" type="no_of_days" placeholder="no_of_days" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full">
					<label htmlFor="price" className="text-sm">price</label>
					<input id="price" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="image" className="text-sm">image link</label>
					<input id="image" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
				</div>
				
			</div>
   <button type="submit">Submit</button>
		</fieldset>
		
	</form>
</section>:null
   }

   </div>
   <div className="bg-slate-200 grid grid-cols-1 mb-80">
   
   
   {console.log('test',selectedPackage)}
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
                    <img className='h-28 w-24' src={singlePackage.image}></img>
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
