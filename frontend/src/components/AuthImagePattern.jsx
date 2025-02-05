import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className='items-center justify-center hidden p-12 lg:flex bg-base-200'>
            <div className='max-w-md text-center'>
                <div className='grid grid-cols-3 gap-4 place-items-center'>
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`bg-blue-500/30 w-24 h-24 rounded-xl ${i % 2 === 0 ? "animate-pulse duration-600 ease-in" : "animate-pulse duration-75 ease-in-out"}`}></div>
                    ))}
                </div>
                <h1 className='mt-8 text-2xl font-bold'>{title}</h1>
                <p className='mt-4 text-lg text-base-content/80'>{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;
