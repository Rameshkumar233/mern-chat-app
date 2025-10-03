import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationCodeInput from "../components/VerificationCodeInput";
import { useAuthStore } from "../store/useAuthStore";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();
    const { isLoading, verifyEmail } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        await verifyEmail(verificationCode);
        navigate("/");
        console.log(typeof verificationCode);
    };
    // useEffect(() => {});

    return (
        <div className='flex items-center justify-center min-h-screen shadow-2xl bg-base-200'>
            <div className='w-full max-w-md p-8 shadow-2xl rounded-2xl border-base-300 bg-base-100'>
                <div className='space-y-3 text-center'>
                    <h2 className='pb-3 text-2xl font-bold border-b border-base-300'>Verify Email</h2>
                    <p className='pb-4 text-sm opacity-70'>Enter 6-digit code sent to your email address</p>
                    <form
                        onSubmit={handleSubmit}
                        className='space-y-8'>
                        <VerificationCodeInput
                            code={code}
                            setCode={setCode}
                        />
                        <div className='mt-4'>
                            <button
                                className='w-full shadow-xl btn btn-primary'
                                type='submit'
                                disabled={isLoading || code.some((digit) => !digit)}>
                                {isLoading ? (
                                    <>
                                        <span className='loading loading-spinner loading-md'></span>
                                        Verifying
                                    </>
                                ) : (
                                    "Verify Email"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
