import React, { useEffect, useState } from 'react';

export default function AllCoupons() {
  const [created, setCreated] = useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Retrieve existing coupons from local storage
    const existingCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    setCoupons(existingCoupons);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const couponCode = formData.get('couponCode');
    const whatFor = formData.get('whatFor');
    const couponData = {
      couponCode: couponCode,
      whatFor: whatFor
    };
    // Retrieve existing coupons from local storage or initialize an empty array
    const existingCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    // Append the new coupon data to the existing coupons
    const updatedCoupons = [...existingCoupons, couponData];
    // Save the updated coupons back to local storage
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    // Update state to display the newly created coupon
    setCoupons(updatedCoupons);
    setCreated(false);
    alert('Coupon created successfully!');
  }

  const removeCoupon = (index) => {
    const updatedCoupons = [...coupons.slice(0, index), ...coupons.slice(index + 1)];
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
  }

  return (
    <>
      <div className="mt-10 flex justify-center">
        {coupons.length > 0 && (
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Existing Coupons:</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600">
                    <th className="px-4 py-2">Coupon Code</th>
                    <th className="px-4 py-2">What For</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white"}>
                      <td className="px-4 py-2">{coupon.couponCode}</td>
                      <td className="px-4 py-2">{coupon.whatFor}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => removeCoupon(index)} className="btn btn-error">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {!created ?
        <div className="flex justify-center mt-8">
          <button onClick={() => { setCreated(true) }} className="btn btn-active btn-primary flex justify-center items-center">Create New Coupon</button>
        </div> : null
      }
      {created ?
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-400">
              Create Your Coupon
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="couponCode" className="block text-sm font-medium leading-6 text-red-400">
                  Coupon Code
                </label>
                <div className="mt-2">
                  <input
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-red-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="whatFor" className="block text-sm font-medium leading-6 text-red-400">
                  What For
                </label>
                <div className="mt-2">
                  <input
                    id="whatFor"
                    name="whatFor"
                    type="text"
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-red-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div> : null
      }
    </>
  );
}
