

import React from 'react'
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import Modal from './Modal';

export default function Allusers() {
 const [users, setUsers] = React.useState([]);
 const {auth} = useAuth();
 const [selectedUser, setSelectedUser] = React.useState(null);

 const handleClick = async (userId) => {
  try {
    const accessToken = auth.accessToken;
    const response = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    setSelectedUser(response.data); // Set the selected user
    console.log('selectuser',response.data)
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const closeModal = () => {
  console.log('SETTING NULL')
  setSelectedUser(null); // Close the modal by resetting selectedUser state
};



 React.useEffect(() => {
  const fetchUsers = async () => {
    try {
      // Assuming you have access to the access token in the auth context
      const accessToken = auth.accessToken;

      const response = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });


      setUsers(response.data); 
      // console.log('response',users);
    } catch (error) {
      console.error('Error fetching users:', error);
     
    }
  };

  fetchUsers();
}, []);
  return (
   <div className=" bg-slate-200 grid grid-cols-1 mb-80">
   <table className="table">
     <thead>
       <tr>
         <th>
           <label>
             <input type="checkbox" className="checkbox" />
           </label>
         </th>
         <th>Name</th>
         <th>Email</th> 
         <th>Role</th>
         <th>Phone Number</th>
         <th></th>
       </tr>
     </thead>
     <tbody>
       {users.map((user, index) => (
         <tr key={index}>
           <td>
             <label>
               <input type="checkbox" className="checkbox" />
             </label>
           </td>
           <td>
             <div className="flex items-center gap-3">
               <div>
                 <div className="font-bold">{user.username}</div>
               </div>
             </div>
           </td>
           <td>{user.email}</td> 
           {/* {console.log(user.roles.User)} */}
           <td>{user.roles.User == 1000? 'Normal User':'Admin'}</td>
           <td>{user.favoriteColor}</td>
           
           <td className='space-x-4 ml-5'>
             <button onClick={()=> handleClick(user._id)} className="btn btn-primary">View</button>
             <button className="btn btn-error">Delete</button>
             <button className="btn btn-accent">Update</button>
           </td>
         </tr>
       ))}
     </tbody>

   </table>
   <div className='flex justify-center'>
   {selectedUser && (
        <Modal user={selectedUser} closeModal={closeModal} />
      )}

   </div>

      
 </div>
  )}
