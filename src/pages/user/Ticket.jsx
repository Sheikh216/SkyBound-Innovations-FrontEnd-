import React from 'react';

export default function Ticket() {
  // Array of objects holding invoice data
  const invoices = [
    {
     invoiceNumber: '97412378923',
      client: 'Microsoft Corporation',
      seat: 'A3',
      amount: '$15,792',
      status: 'Pending'
    },
    {
      invoiceNumber: '97412378923',
      client: 'Tesla Inc.',
      seat: 'A4',
      amount: '$275',
      status: 'Pending'
    },
    {
      invoiceNumber: '97412378923',
      client: 'Coca Cola co.',
      seat: 'B1',
      
      amount: '$8,950,500',
      status: 'Pending'
    },
    {
      invoiceNumber: '97412378923',
      client: 'Nvidia Corporation',
      seat: 'A5',
      amount: '$98,218',
      status: 'Pending'
    }
  ];

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
                <th className="p-3">Destination</th>
                <th className="p-3">Seat</th>
                
                <th className="p-3">Amount</th>
                <th className="p-3">Create Ticket</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">
                    <p>{invoice.invoiceNumber}</p>
                  </td>
                  <td className="p-3">
                    <p>{invoice.client}</p>
                  </td>
                  <td className="p-3">
                    <p>{invoice.seat}</p>
                  </td>

                  <td className="p-3 ">
                    <p>{invoice.amount}</p>
                  </td>
                  <td className="p-3 ">
                    <span><button className='btn btn-primary'>Create Ticket</button></span>
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
