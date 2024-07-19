"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Navbar.css';
import logo from './fitgf.png';

const Navbar = () => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/admin/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'

            });
            if (response.ok) {
                // Admin is authenticated
                setIsAdminAuthenticated(true);
            } else {
                // Admin is not authenticated
                setIsAdminAuthenticated(false);
               
            }
        }
        catch (error) {
            console.error('An error occurred during admin authentication check', error);
            setIsAdminAuthenticated(false);

        }
    }

    useEffect(() => {
        checkAdminAuthentication();
    }, []);
    return (
        <div className='navbar'>
            <Image src={logo} alt="Logo" width={100} className='logo' />

            <div className='adminlinks'>
                {isAdminAuthenticated ? (
                    <>
                        {/* Show links for authenticated admin */}
                        <Link href='/pages/addworkout'>Add Workout</Link>
                    </>
                ) : (
                    <>  
                        {/* Show login/signup links for unauthenticated admin */}
                        <Link href='/adminauth/login'>Login</Link>
                        <Link href='/adminauth/signup'>Signup</Link>
                    </>
                )}
            </div>
        </div >
    )
}

export default Navbar