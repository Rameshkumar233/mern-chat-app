import React from "react";
import { X, Trash2 } from "lucide-react";

const SelectionBar = ({ setSelectionMode, selectedMessages, setOpenSelectModal }) => {
    return (
        <div className='flex items-center justify-between w-full p-5 bg-gray-700 rounded'>
            <div className='flex gap-x-3'>
                <button
                    onClick={() => {
                        setSelectionMode(false);
                        selectedMessages.clear();
                    }}>
                    <X />
                </button>
                <span className='text-white'>Delete Selected Messages ({selectedMessages.size} Selected)</span>
            </div>
            <button
                onClick={() => {
                    setOpenSelectModal((prev) => !prev);
                    setSelectionMode(false);
                }}>
                <Trash2 size={24} />
            </button>
        </div>
    );
};

export default SelectionBar;
