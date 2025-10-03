import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, LockKeyhole, Mail, MessageSquare, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const { signup, isLoading } = useAuthStore();

    const validateForm = () => {
        const { fullName, email, password } = formData;
        if (!fullName.trim()) return toast.error("Please enter full name");
        if (fullName.length < 3) return toast.error("Full name must be atleast 3 characters long");
        if (fullName.length > 30) return toast.error("Full name cannot exceed 30 characters");
        if (!email.trim()) return toast.error("Please enter Email address");
        if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid Email Address");
        if (!password.trim()) return toast.error("Password is required");
        if (password.length < 6) return toast.error("Password must be atleast 6 characters long");
        if (passwordStrength < 2) return toast.error("Password must contain atleast one letter and one number");
        if (password !== confirmPassword) return toast.error("Passwords do not match");
        return true;
    };
    const passwordStrengthOnOutline = passwordStrength === 4 ? "focus:outline-green-500" : passwordStrength === 3 ? "focus:outline-yellow-500" : passwordStrength === 2 ? "focus:outline-orange-600" : "focus:outline-red-500";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) {
            await signup(formData);
            navigate("/verify-email");
        }
    };
    const { fullName, email, password, confirmPassword } = formData;

    return (
        <div className='grid min-h-screen pt-16 lg:grid-cols-2'>
            {/* Left side */}
            <div className='flex items-center justify-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-5'>
                    {/* Logo */}
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className='flex items-center justify-center transition-colors size-12 rounded-xl bg-primary/10 group-hover:bg-primary/25'>
                            <MessageSquare className='size-5 text-primary' />
                        </div>
                        <h1 className='mt-2 text-2xl font-bold'>Create Account</h1>
                        <p className='text-base-content/60'>Get started with your free account</p>
                    </div>
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className='space-y-5'>
                        {/* Full Name */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Full Name</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none '>
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    name='fullName'
                                    type='text'
                                    placeholder='Eg.John Doe'
                                    className='w-full pl-10 input input-bordered placeholder:opacity-75'
                                    value={fullName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        {/* Email */}
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
                                    placeholder='Eg.john.doe@gmail.com'
                                    className='w-full pl-10 input input-bordered placeholder:opacity-75'
                                    value={email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        {/* Password */}
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
                                    placeholder='......'
                                    className={`input input-bordered w-full pl-10 placeholder:tracking-[5px] ${passwordStrengthOnOutline}`}
                                    value={password}
                                    onChange={(e) => handleChange(e)}
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                />
                                {/* Toggle password visibility */}
                                <button
                                    type='button'
                                    aria-label='toggle password visibility'
                                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                                    onClick={() => setShowPassword((prevState) => !prevState)}>
                                    {showPassword ? <Eye className='size-5 text-base-content/40' /> : <EyeOff className='size-5 text-base-content/40' />}
                                </button>
                            </div>
                            {isFocusedPassword && (
                                <PasswordStrengthMeter
                                    password={password}
                                    passwordStrength={passwordStrength}
                                    setPasswordStrength={setPasswordStrength}
                                />
                            )}
                        </div>
                        {/* Confirm Password */}
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Confirm Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <LockKeyhole className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    name='confirmPassword'
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='.......'
                                    className={`input input-bordered w-full pl-10 placeholder:tracking-[5px] ${confirmPassword.includes(password) ? "focus:outline-green-500" : "focus:outline-red-500"}`}
                                    value={confirmPassword}
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* Toggle Password Visibility */}
                                <button
                                    type='button'
                                    aria-label='toggle password visibility'
                                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                                    onClick={() => setShowConfirmPassword((prevState) => !prevState)}>
                                    {showConfirmPassword ? <Eye className='size-5 text-base-content/40' /> : <EyeOff className='size-5 text-base-content/40' />}
                                </button>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full btn btn-primary'>
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    {/* Sign in link */}
                    <div className='text-center'>
                        <p className='text-base-content/40'>
                            Already Have an Account?{" "}
                            <Link
                                to='/signin'
                                className='link link-hover link-primary'>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Right side */}
            <AuthImagePattern
                title='Join our community today!'
                subtitle='Connect with friends and the world around you on ChatApp.'
            />
        </div>
    );
};

export default SignUpPage;
