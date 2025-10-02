import { useEffect, useRef, useState } from "react";
import { X, SmilePlus } from "lucide-react";
import Picker from "emoji-picker-react";

export const EmojiPicker = ({ setText }) => {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        }
        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPicker]);

    const handleEmojiClick = (emojiObject) => {
        setText((prev) => `${prev} ${emojiObject.emoji}`);
    };

    return (
        <div className='relative inline-block'>
            <button
                ref={buttonRef}
                type='button'
                onClick={() => setShowPicker((prev) => !prev)}>
                <SmilePlus />
            </button>
            {/* Emoji Picker */}
            {showPicker && (
                <div className='fixed sm:-right-[40%] inset-0 flex justify-center items-center bg-black/30 z-50'>
                    <div
                        ref={pickerRef}
                        className='bg-zinc-300 shadow-lg rounded-lg p-2 w-[370px] maxf-w-xs sm:max-w-md md:max-w-lg'>
                        <div className='flex items-center justify-between mb-2 text-base-100'>
                            <h4 className='text-sm font-medium '>Select Emoji</h4>
                            <button
                                onClick={() => setShowPicker(false)}
                                className=' hover:text-red-500'>
                                <X />
                            </button>
                        </div>
                        <Picker
                            onEmojiClick={handleEmojiClick}
                            searchDisabled={true}
                            className='max-h-80'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
