import React from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hello, How are you?", isSent: false },
    { id: 2, content: "I'm fine and you?", isSent: true },
];
const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className='container max-w-5xl min-h-screen px-4 pt-20 pb-12 mx-auto min-w-max'>
            {/* Title */}
            <div className='flex flex-col gap-2 mb-2'>
                <h1 className='text-xl font-semibold '>Theme</h1>
                <p className='text-sm text-base-content/70'>Choose Your Theme</p>
            </div>
            {/* Themes */}
            <div className='grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8'>
                {THEMES.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg ${theme === t ? "bg-base-300" : "hover:bg-base-300/90"} transition-colors`}>
                        <div
                            className='relative w-full h-8 overflow-hidden rounded-lg'
                            data-theme={t}>
                            <div className='absolute inset-0 grid grid-cols-4 gap-1 p-2'>
                                <div className='rounded bg-primary'></div>
                                <div className='rounded bg-secondary'></div>
                                <div className='rounded bg-accent'></div>
                                <div className='rounded bg-neutral'></div>
                            </div>
                        </div>
                        <div className='w-full text-sm font-medium text-center truncate'>{t.charAt(0).toUpperCase() + t.slice(1)}</div>
                    </button>
                ))}
            </div>
            {/* Preview Messages */}
            <h3 className='my-4 text-xl font-bold'>Preview</h3>
            <div className='p-4 overflow-hidden border rounded-md shadow-sm border-base-300 bcg-base-300'>
                {/* User */}
                <div className='max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg bg-base-300'>
                    {/* Header */}
                    <div className='px-4 py-3 border border-b border-base-300 bg-base-100'>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center justify-center font-medium rounded-full size-8 bg-primary text-primary-content'>J</div>
                            <div>
                                <h2 className='text-sm font-semibold'>John Doe</h2>
                                <p className='text-xs text-succ'>Online</p>
                            </div>
                        </div>
                    </div>
                    {/* Messages */}
                    <div className='p-4 space-y-4 min-h-[200px] min-w-[200px] bg-base-300 overflow-auto'>
                        {PREVIEW_MESSAGES.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                                <div className={`p-4 shadow-md rounded-md max-w-[80%] ${message.isSent ? "bg-primary text-primary-content" : "bg-base-100"} `}>
                                    <p className='text-sm font-medium'>{message.content}</p>
                                    <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/80" : "text-base-content/70"}}`}>12:00 pm</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Footer */}
                    <div className='p-4 border-t border-base-300 bg-base-100'>
                        <div className='flex gap-2'>
                            <input
                                type='text'
                                className='flex-1 h-10 text-sm input input-bordered'
                                placeholder='Type your message...'
                                readOnly
                            />
                            <button className='h-10 min-h-0 btn btn-primary'>
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
