import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Image, X, Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { EmojiPicker } from "./EmojiPicker";

const MessageInput = () => {
    const { sendMessage } = useChatStore();
    const [text, setText] = useState("");
    const [height, setHeight] = useState("auto");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef();
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        setText(e.target.value);
        if (text === "") {
            setHeight("auto");
        } else {
            setHeight(`${textareaRef.current.scrollHeight}px`);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        setHeight("auto");
        try {
            await sendMessage({ text: text.trim(), image: imagePreview });
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log("Failed to send the message!", error);
        }
    };

    return (
        <div className='w-full p-4'>
            {/* Image Preview */}
            {imagePreview && (
                <div className='flex items-center gap-2 p-4 mb-2 bg-base-300'>
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt='Preview'
                            className='object-cover border rounded-lg size-40 border-x-zinc-700'
                        />
                        <button
                            className='absolute flex items-center justify-center rounded-full size-8 -top-3 -right-3 bg-base-300'
                            type='button'
                            onClick={removeImage}>
                            <X size={15} />
                        </button>
                    </div>
                </div>
            )}
            {/* Message input form */}
            <form
                onSubmit={handleSendMessage}
                className='flex items-center gap-2'>
                <div className='relative flex items-center flex-1 w-full'>
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleInput}
                        style={{ height }}
                        rows={1}
                        placeholder='Type a message...'
                        className='max-h-32 w-full rounded-lg !pr-12 input input-bordered input-sm sm:input-md resize-none py-2 scrollbar-none tracking-wider !text-lg'
                    />
                    <div className='absolute right-3'>
                        <EmojiPicker setText={setText} />
                    </div>
                </div>
                {/* File Input */}
                <input
                    type='file'
                    ref={fileInputRef}
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                />
                <button
                    className={`btn btn-circle sm:flex ${imagePreview ? "text-emerald-500" : "text-slate-600"}`}
                    onClick={() => fileInputRef.current?.click()}>
                    <Image size={20} />
                </button>
                {/* Send Button */}
                <button
                    type='submit'
                    disabled={!text.trim() && !imagePreview}
                    className='btn btn-circle text-emerald-500'>
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
