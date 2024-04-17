import React from 'react'
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import Modal from './Modal';

export default function AllAirlines() {
  const [users, setUsers] = React.useState([]);
  const {auth} = useAuth();
  const [selectedUser, setSelectedUser] = React.useState(null);

  const fetchUsers = async () => {
    try {
      // Assuming you have access to the access token in the auth context
      const accessToken = auth.accessToken;

      const response = await axios.get('/admin/airlines', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUsers(response.data); 
      console.log('response',users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleClick = async (userId) => {
    const selectedUser = users.find( (user) => user._id === userId );
    setSelectedUser(selectedUser); // Set the selected user
  };

const handleDelete = async (userId) => {
  try {
    const response = await axios.delete('/admin/airlines', {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      },
      data: {
        id: userId
      }
    });
    fetchUsers();
  } catch(err) {
    console.log(err);
  }
}

const closeModal = () => {
  console.log('SETTING NULL')
  setSelectedUser(null); // Close the modal by resetting selectedUser state
};



 React.useEffect(() => {
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
           

           
           <td className='space-x-4 ml-5'>
             <button onClick={()=> handleClick(user._id)} className="btn btn-primary">View</button>
             <button onClick={()=> handleDelete(user._id)} className="btn btn-error">Delete</button>
             
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