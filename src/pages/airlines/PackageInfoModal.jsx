import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const PackageInfoModal = ({ Info, fetchPackages }) => {

  const { auth } = useAuth();
  const [id, setId] = useState('');
  const [packagename, setPackagename] = useState('');
  const [destination, setDestination] = useState('');
  const [no_of_days, setNo_of_days] = useState('');
  const [price, setPrice] = useState('');
  const [hotel, setHotel] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (Info) {
      setId(Info._id || '');
      setPackagename(Info.packagename || '');
      setDestination(Info.destination || '');
      setNo_of_days(Info.no_of_days || '');
      setPrice(Info.price || '');
      setHotel(Info.hotel || '');
      setImage(Info.image || '');
    }
  }, [Info]);

  const handlePackageInfoUpdate = async () => {
    const response = await axios.put('/airline/package', {
      id: id,
      packagename: packagename,
      destination: destination,
      no_of_days: no_of_days,
      price: price,
      hotel: hotel,
      image: image
    }, {
     headers: {
       Authorization: `Bearer ${auth.accessToken}`
     }
   });
   fetchPackages();
  }

  return (
    <>
<dialog id="package_info_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>

    <label className="input input-bordered flex items-center gap-2">
        Package Name
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setPackagename(e.target.value)} value={packagename}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
        Destination
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setDestination(e.target.value)} value={destination}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
        No Of Days
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setNo_of_days(e.target.value)} value={no_of_days}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
      Price
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setPrice(e.target.value)} value={price}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
        Hotel
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setHotel(e.target.value)} value={hotel}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
        Image
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setImage(e.target.value)} value={image}/>
    </label>


    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-accent" onClick={handlePackageInfoUpdate}>Update</button>
        <button className="btn">Close</button>
      </form> 
    </div>
  </div>
</dialog>
</>

  );
};

export default PackageInfoModal;