import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className='flex-col items-center justify-center flex-1 hidden w-full h-full p-12 sm:flex bg-base-100/50'>
            <div className='flex items-center justify-center w-full max-w-md space-y-6 '>
                <div className='flex items-center justify-center size-16 bg-primary/10 animate-bounce rounded-2xl'>
                    <MessageSquare className='size-8 text-primary' />
                </div>
            </div>
            <div className='text-xl text-center'>
                <h2 className='my-5 font-bold '>Welcome to ChatOne App!</h2>
                <p className='text-base-content/70'>Start a conversation with your friends and family.</p>
            </div>
        </div>
    );
};

export default NoChatSelected;
