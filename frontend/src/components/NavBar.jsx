import React from "react";
import { Link } from "react-router-dom";
import { Settings, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const NavBar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className='fixed top-0 z-50 w-full border-b bg-base-100 backdrop-blur-lg bg-opacity-80 border-base-300'>
            <div className='container h-16 px-5 py-2 mx-auto'>
                <div className='flex items-center justify-between h-full'>
                    {/* Left Side */}
                    <div className='flex items-center justify-between'>
                        <Link
                            to='./'
                            className='flex items-center justify-center font-bold gap-x-3'>
                            <img
                                src='/logo.png'
                                alt='Logo'
                                className='h-8 size- fill-black'
                            />
                        </Link>
                    </div>
                    {/* Right Side */}
                    <div className='flex items-center gap-x-4'>
                        <Link
                            to='/settings'
                            className='btn btn-sm'>
                            <Settings className='size-5' />
                            <span className='hidden sm:inline'>Settings</span>
                        </Link>
                        {authUser && (
                            <>
                                <Link
                                    to='/profile'
                                    className='btn btn-sm'>
                                    <User className='size-4' />
                                    <span className='hidden sm:inline'>Profile</span>
                                </Link>
                                <button
                                    className='btn btn-sm'
                                    onClick={logout}>
                                    <LogOut className='size-5' />
                                    <span className='hidden sm:inline'>LogOut</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
