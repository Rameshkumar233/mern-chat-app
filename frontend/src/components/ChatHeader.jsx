import { MoreVertical, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = ({ setSelectionMode, setOpenClearModal }) => {
    const { selectedUser, setSelectedUser, unsubscribeFromMessages, setFullScreenView } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className='p-3 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                {/* User Info */}
                <div className='flex items-center gap-x-2'>
                    <div className='avatar'>
                        <div className='relative rounded-full size-10'>
                            <img
                                src={selectedUser.profilePic || "/avatar.png"}
                                alt={selectedUser.fullName}
                                onClick={() => setFullScreenView(selectedUser.profilePic)}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-medium'>{selectedUser.fullName}</h3>
                        <p className={`text-xs ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-red-400"}`}>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                    </div>
                </div>
                {/* Options */}
                <div className='flex items-center justify-center gap-x-4'>
                    <div
                        className='space-x-3 dropdown dropdown-left'
                        tabIndex={0}>
                        <button>
                            <MoreVertical />
                        </button>
                        <div className='z-10 p-4 space-y-3 shadow dropdown-content bg-base-300 rounded-box w-44'>
                            <div>
                                <button onClick={() => setSelectionMode((prev) => !prev)}>Select Messgaes</button>
                            </div>
                            <div>
                                <button onClick={() => setOpenClearModal((prev) => !prev)}>Clear All Messages</button>
                            </div>
                        </div>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => {
                            if (selectedUser) {
                                unsubscribeFromMessages(selectedUser._id);
                            }
                            setSelectedUser(null);
                        }}>
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
