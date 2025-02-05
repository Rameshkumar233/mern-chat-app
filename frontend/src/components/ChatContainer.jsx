import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import Message from "./Message";
import SelectionBar from "./SelectionBar";
import ConfirmationModal from "./ConfirmationModal";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { groupMessagesByDate } from "../lib/utils";

const ChatContainer = () => {
    const { isMessagesLoading, messages, getMessages, deleteMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { authUser, onlineUsers } = useAuthStore.getState();
    const [selectedMessages, setSelectedMessages] = useState(new Set());
    const [selectionMode, setSelectionMode] = useState(false);
    const [openSelectModal, setOpenSelectModal] = useState(false);
    const [openClearModal, setOpenClearModal] = useState(false);
    const messageEndRef = useRef(null);
    const groupMessages = groupMessagesByDate(messages);

    useEffect(() => {
        if (selectedUser._id) {
            getMessages(selectedUser._id);
            subscribeToMessages(selectedUser._id);
        }

        return () => {
            unsubscribeFromMessages(selectedUser._id);
        };
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const toggleSelection = (messageId) => {
        setSelectedMessages((prevSelected) => {
            const updatedSelection = new Set(prevSelected);
            if (updatedSelection.has(messageId)) {
                updatedSelection.delete(messageId);
            } else {
                updatedSelection.add(messageId);
            }
            return updatedSelection;
        });
    };
    const clearAllMessages = () => {
        setSelectedMessages(new Set());
        deleteMessages(messages.map((msg) => msg._id));
    };

    const deleteSelectedMessages = () => {
        deleteMessages(Array.from(selectedMessages));
        setSelectedMessages(new Set());
    };

    if (isMessagesLoading) {
        return (
            <div className='flex flex-col flex-1'>
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }
    return (
        <div className='flex flex-col flex-1 h-full'>
            {/* Chat Header */}
            <ChatHeader
                setSelectionMode={setSelectionMode}
                setOpenClearModal={setOpenClearModal}
            />
            {/* Action Modal */}
            <ConfirmationModal
                openModal={openSelectModal}
                handleDelete={deleteSelectedMessages}
                setOpenModal={setOpenSelectModal}
                selectedMessages={selectedMessages}
                title='Are you sure?'
                message='Do you want to delete the selected messages?'
            />
            <ConfirmationModal
                openModal={openClearModal}
                handleDelete={clearAllMessages}
                setOpenModal={setOpenClearModal}
                title='Are you sure?'
                message='Do you want to delete all messages?'
            />
            {/* Messages */}
            <div className='flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin'>
                {Object.entries(groupMessages).map(([date, messagesForDate]) => {
                    return (
                        <div
                            key={date}
                            className='mb-6'>
                            {/* Date Header */}
                            <div className='my-4 text-sm text-center text-gray-500 bg-base-200'>{date}</div>
                            {messagesForDate.map((message) => {
                                return (
                                    <Message
                                        key={message._id}
                                        message={message}
                                        authUser={authUser}
                                        selectedUser={selectedUser}
                                        selectionMode={selectionMode}
                                        selectedMessages={selectedMessages}
                                        onlineUsers={onlineUsers}
                                        toggleSelection={toggleSelection}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>
            {/* Input Field and Selection Bar */}
            {selectionMode ? (
                <SelectionBar
                    selectedMessages={selectedMessages}
                    setSelectionMode={setSelectionMode}
                    setOpenSelectModal={setOpenSelectModal}
                />
            ) : (
                <MessageInput />
            )}
        </div>
    );
};
export default ChatContainer;
