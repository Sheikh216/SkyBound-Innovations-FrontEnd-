import React from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function SingleView({}) {
  const { id } = useParams();
  const {auth} = useAuth();
  const [packageData,setPackageData] = React.useState('')
  React.useEffect(() => {
    const loadPackage = async () => {
      try {
        const accessToken = auth.accessToken;
        const response = await axios.get(`http://localhost:3001/user/package/${id}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setPackageData(response.data);
        console.log('response_singlePackage',response.data);
        console.log('auth',auth)
      } catch (error) {
        console.error("Error loading package:", error);
      }
    };

    loadPackage();
  }, []); // Include id in the dependency array

  // ADD TO CART 
  const addToCart = () => {
    // Check if packageData exists
    if (packageData) {
      // Get existing cart items from localStorage or initialize an empty array
      const existingCartItems = JSON.parse(localStorage.getItem(auth.username)) || [];
      
      // Add the current packageData to cart
      existingCartItems.push({ packageName: packageData.packagename, price: packageData.price,image:packageData.image });
      
      // Update localStorage with the new cart items
      localStorage.setItem(auth.username, JSON.stringify(existingCartItems));
      
      // Optionally, you can display a message to indicate successful addition to cart
      alert('Item added to cart successfully!');
    }
  };


  // ADD TO CART ENDS
 
  return (
<div className="hero min-h-screen" style={{backgroundImage: `url(${packageData.image})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello From <span className='text-blue-500 text-7xl'>{packageData.airline_username}</span></h1>
      <p className="mb-5"><span className='text-red-400 text-3xl'>Package Name : {packageData.packagename}</span></p>
      <p className="mb-5"><span className='text-red-400 text-3xl'>PRICE : {packageData.price}</span></p>
      {/* <p className="mb-5"><span className='text-red-400 text-3xl'>Hotels : {}</span></p> */}
      <button className="btn btn-primary" onClick={addToCart}>ADD TO CART</button>
    </div>
  </div>
</div>
  )
}
