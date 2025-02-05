import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
    const { login, isLoggingIn } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { email, password } = formData;
    return (
        <div className='grid min-h-screen pt-16 lg:grid-cols-2'>
            {/* Right Side */}
            <div className='flex items-center justify-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-5'>
                    {/* Logo and Title */}
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className='flex items-center justify-center transition-colors size-12 rounded-xl bg-primary/10 group-hover:bg-primary/25'>
                            <MessageSquare className='size-5 text-primary' />
                        </div>
                        <h1 className='mt-2 text-2xl font-bold'>Sign In</h1>
                        <p className='text-base-content/60'>Let's start with ChatOne By Login</p>
                    </div>
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className='space-y-5'>
                        {/* Email Input */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    name='email'
                                    type='text'
                                    placeholder='johndoe@gmail.com'
                                    className='w-full pl-10 input input-bordered'
                                    value={email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        {/* Password Input */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='.......'
                                    className='input input-bordered w-full pl-10 placeholder:tracking-[5px]'
                                    value={password}
                                    onChange={(e) => handleChange(e)}
                                />
                                <button
                                    type='button'
                                    aria-label='toggle password visibility'
                                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                                    onClick={() => setShowPassword((prevState) => !prevState)}>
                                    {showPassword ? <Eye className='size-5 text-base-content/40' /> : <EyeOff className='size-5 text-base-content/40' />}
                                </button>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full btn btn-primary'>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className='mr-2 size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>
                    {/* Sign Up Link */}
                    <div className='text-center'>
                        <p className='text-base-content/40'>
                            Don't have an account yet?{" "}
                            <Link
                                to='/signup'
                                className='link link-hover link-primary'>
                                Create an Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Left Side */}
            <AuthImagePattern
                title='Welcome Back to ChatOne App'
                subtitle="Let's Start Your Conversation With your friends!"
            />
        </div>
    );
};

export default LoginPage;
