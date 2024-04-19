import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const FlightInfoModal = ({ Info, fetchFlights }) => {

  const { auth } = useAuth();
  const [id, setId] = useState('');
  const [flightName, setFlightName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (Info) {
      setId(Info._id || '');
      setFlightName(Info.flightName || '');
      setFrom(Info.from || '');
      setTo(Info.to || '');
      setTime(Info.time || '');
      setPrice(Info.price || '');
    }
  }, [Info]);

  const handleFlightInfoUpdate = async () => {
    const response = await axios.put('/airline/flight', {
      id: id,
      flightName: flightName,
      from: from,
      to: to,
      time: time,
      price: price
    }, {
     headers: {
       Authorization: `Bearer ${auth.accessToken}`
     }
   });
    fetchFlights();
  }

  return (
    <>
<dialog id="flight_info_modal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>

    <label className="input input-bordered flex items-center gap-2">
      Flight Name
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setFlightName(e.target.value)} value={flightName}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
      From
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setFrom(e.target.value)} value={from}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
      To
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setTo(e.target.value)} value={to}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
      Time
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setTime(e.target.value)} value={time}/>
    </label>

    <label className="input input-bordered flex items-center gap-2">
      Price
      <input type="text" className="grow" placeholder="Daisy" 
      onChange={(e) => setPrice(e.target.value)} value={price}/>
    </label>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-accent" onClick={handleFlightInfoUpdate}>Update</button>
        <button className="btn">Close</button>
      </form> 
    </div>
  </div>
</dialog>
</>

  );
};

export default FlightInfoModal;
