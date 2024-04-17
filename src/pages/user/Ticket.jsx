import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import MyPDF from './MyPDF';


export default function Ticket() {

  const { auth } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Make HTTP request to fetch history data
        const response = await axios.get('/user/history', {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        });
        // Extract the history data from the response
        const historyData = response.data;
        // Update the state with the fetched history data
        setHistory(historyData);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    // Call the fetchHistory function when the component mounts
    fetchHistory();
  }, []); // Em

  if(history.length === 0) {
    return (
      <div><p>Loading!!!</p></div>
    )
  }


const createTicket = async (payment_id) => {
}



  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Transactions ID #</th>
                <th className="p-3">Package Name</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Time</th>
                <th className="p-3">Seat</th>
                <th className="p-3">Status</th>
                <th className="p-3">Create Ticket</th>
              </tr>
            </thead>
            <tbody>
              {history.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">
                    <p>{invoice._id}</p>
                  </td>
                  <td className="p-3">
                    <p>{invoice.package_name}</p>
                  </td>
                  <td className="p-3">
                    <p>{invoice.flightInfo[0].from}</p>
                  </td>
                  <td className="p-3">
                    <p>{invoice.flightInfo[0].to}</p>
                  </td>
                  <td className="p-3">
                    <p>{invoice.flightInfo[0].time}</p>
                  </td>

                  <td className="p-3 ">
                    <p>{invoice.seats}</p>
                  </td>
                  <td className="p-3 ">
                    <p>{invoice.status}</p>
                  </td>
                  <td className="p-3">
                    <span>
                      <MyPDF flightDetails={invoice} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

