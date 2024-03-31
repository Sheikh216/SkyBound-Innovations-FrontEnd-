import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
  const { auth } = useAuth();
  const [cartItems, setCartItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    // Fetch cart items from localStorage using auth.username
    const items = JSON.parse(localStorage.getItem(auth.username)) || [];
    console.log(items)
    setCartItems(items);

    // Calculate total price
    let totalPrice = items.reduce((total, item) => {
      // Remove non-numeric characters and convert to number
      const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + numericPrice;
    }, 0);
    setTotalPrice(totalPrice);
  }, [auth.username]);

  // Function to remove an item from cart
// Function to remove an item from cart
const removeFromCart = (index) => {
 const updatedCart = [...cartItems];
 const removedItem = updatedCart.splice(index, 1)[0]; // Remove item and get removed item
 setCartItems(updatedCart);
 localStorage.setItem(auth.username, JSON.stringify(updatedCart));

 // Update total price by subtracting the price of the removed item
 const numericPrice = parseFloat(removedItem.price.replace(/[^\d.]/g, ''));
 setTotalPrice(totalPrice - numericPrice);
};


  return (
    <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <h2 className="text-xl font-semibold">Your cart</h2>
      <ul className="flex flex-col divide-y dark:divide-gray-300">
        {cartItems.map((item, index) => (
          <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={item.image} alt={item.name} />
              <p>Package Name: {item.packageName}</p>
              <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.name}</h3>
                    <p className="text-sm dark:text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{item.price}</p>
                    <p className="text-sm line-through dark:text-gray-400">{item.oldPrice}</p>
                  </div>
                </div>
                <div className="flex text-sm divide-x">
                  <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={() => removeFromCart(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Remove</span>
                  </button>
                  <button type="button" className="flex items-center px-2 py-1 space-x-1">
                    <span>Add to favorites</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>Total amount: <span className="font-semibold">{totalPrice.toFixed(2)} €</span></p>
        <p className="text-sm dark:text-gray-600">Not including taxes and shipping costs</p>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" className="px-6 py-2 border rounded-md dark:border-violet-600">Back <span className="sr-only sm:not-sr-only">to shop</span></button>
        <button type="button" className="px-6 py-2 border rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600">
          <span className="sr-only sm:not-sr-only">Continue to</span> Checkout
        </button>
      </div>
    </div>
  );
}
