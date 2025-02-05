import React from "react";

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);
    return (
        <div className='flex-1 p-4 space-y-4 overflow-auto scrollbar-none'>
            {skeletonMessages.map((_, index) => (
                <div
                    className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"}}`}
                    key={index}>
                    <div className='chat-image avatar'>
                        <div className='rounded-full size-10'>
                            <div className='w-full h-full rounded-full skeleton'></div>
                        </div>
                    </div>
                    <div className='mb-1 chat-header'>
                        <div className='w-16 h-4 skeleton'></div>
                    </div>
                    <div className='p-0 bg-transparent chat-bubble'>
                        <div className='skeleton h-16 w-[200px]'></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
