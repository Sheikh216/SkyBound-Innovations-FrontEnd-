import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedAuthString = localStorage.getItem('auth');
        if (storedAuthString) {
            const storedAuth = JSON.parse(storedAuthString);
            setAuth(storedAuth);
        }
        console.log("here");
    }, []); // Include setAuth in the dependency array to ensure it's called only once

    return (
        <>
            <Outlet />
        </>
    );
}

export default PersistLogin;