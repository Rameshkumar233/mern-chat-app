import { useState } from "react";
import { formatMessageTime } from "../lib/utils";

const Message = (props) => {
    const { message, authUser, selectedUser, selectedMessages, toggleSelection, selectionMode, onlineUsers } = props;
    const isSentByUser = (message) => message.senderId === authUser._id;
    const [seenMessages, setSeenMessages] = useState(new Set());

    const getMessageStatus = (message) => {
        if (seenMessages.has(message._id)) {
            return "Seen";
        }
        if (onlineUsers.includes(message.receiverId)) {
            setSeenMessages((prev) => new Set(prev).add(message._id));
            return "Seen";
        }
        return "Sent";
    };

    return (
        <div className={`chat ${isSentByUser(message) ? "chat-end" : "chat-start"}`}>
            {/* Profile picture and checkbox */}
            <div className={`chat-image avatar flex items-center gap-x-5 align-middle ${!isSentByUser(message) && "flex-row-reverse"}`}>
                <div className='border rounded-full size-10'>
                    <img
                        src={(isSentByUser(message) ? authUser.profilePic : selectedUser.profilePic) || "/avatar.png"}
                        alt='profile pic'
                    />
                </div>
                <input
                    type='checkbox'
                    checked={selectedMessages.has(message._id)}
                    onChange={() => toggleSelection(message._id)}
                    className={`mb-2 size-4 accent-blue-700 ${selectionMode ? "block" : "hidden"} `}
                />
            </div>
            {/* Message time */}
            <div className='mb-1 chat-header'>
                <time className='ml-1 text-xs opacity-50'>{formatMessageTime(message.createdAt)}</time>
            </div>
            {/* Message content */}
            <div className={`chat-bubble flex flex-col max-w-72 brake-words overflow-hidden ${isSentByUser(message) && "chat-bubble-primary"}`}>
                {message.image && (
                    <img
                        src={message.image}
                        alt='Attachment'
                        className='sm:max-w-[200px] rounded-sm mb-2'
                    />
                )}
                {message.text && <p className='break-words whitespace-pre-wrap'>{message.text}</p>}
            </div>
            {/* Message status */}
            {isSentByUser(message) && (
                <div className={`chat-footer text-xs ${isSentByUser(message) ? "text-right" : "text-left"}`}>
                    <span className={`${getMessageStatus(message) === "Seen" ? "text-green-400" : "text-blue-400"}`}>{getMessageStatus(message)}</span>
                </div>
            )}
        </div>
    );
};

export default Message;
