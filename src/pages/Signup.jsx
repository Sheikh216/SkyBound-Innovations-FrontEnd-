import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

const SIGNUP_URL = '/register';

export default function Signup() {

  useEffect(() => {
    document.title = "Signup";
  }, [])

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(SIGNUP_URL, 
        JSON.stringify({ username, password, email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        console.log('response',response.data)
        navigate('/login');
    } catch (err) {
      console.log(err);
    }

  }
 return (
   <>
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <img
           className="mx-auto h-10 w-auto"
           src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
           alt="Your Company"
         />
         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Create Your Free Account
         </h2>
       </div>

       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form className="space-y-6" onSubmit={handleSubmit}>
           <div>
             <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
             </label>
             <div className="mt-2">
               <input
                 id="username"
                 name="username"
                 type="username"
                 autoComplete="off"
                 onChange={(e) => setUsername(e.target.value)}
                 value={username}
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
           <div>
             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
             </label>
             <div className="mt-2">
               <input
                 id="password"
                 name="password"
                 type="password"
                 autoComplete="off"
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
           {/* Email starts*/}

           <div>
             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
             </label>
             <div className="mt-2">
               <input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="off"
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
           



           {/* Email ends */}
            <div>
             <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Sign Up
             </button>
           </div>
         </form>
       </div>
     </div>
   </>
 )
}
