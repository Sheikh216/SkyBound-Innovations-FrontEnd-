import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import side_navigation from '../../Dashboard/side_navigation';
import UserProfile from '../../Dashboard/UserProfile';

const UserDashboard = () => {
  const {auth} = useAuth();
  useEffect(() => {
    // console.log("welcome");
    // console.log(auth);
  }, [])
  return (
    <>
    <side_navigation />
    <UserProfile />
    <div className="flex items-center justify-center h-screen">
        <h1 className="text-5xl text-center">UserDashboard</h1>
    </div>
    </>
  )
}

export default UserDashboard