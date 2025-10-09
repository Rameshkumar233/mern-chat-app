import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SideBarSkeleton";
import Search from "./Search";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const SideBar = () => {
    const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading, setFullScreenView } = useChatStore();
    const { onlineUsers, authUser } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const searchedUsers = users.filter((user) => user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredUsers = searchQuery ? searchedUsers : users;

    const highlightText = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query.split("").join("")})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span
                    key={index}
                    className='text-lg font-bold text-amber-600'>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    if (isUsersLoading) return <SidebarSkeleton />;
    return (
        <aside className={`sm:flex sm:flex-col h-full transition-all duration-300 sm:border-r md:w-80 sm:w-72 sm:border-base-300 ${selectedUser && "hidden sm:block"}`}>
            <div className='w-full p-4'>
                {/* Header */}
                <div className='flex items-center gap-x-3'>
                    <img
                        src={authUser.profilePic || "/avatar.png"}
                        className='object-cover rounded-full size-16 '
                        alt={authUser.name}
                        onClick={() => setFullScreenView(authUser.profilePic)}
                    />
                    <h3 className='font-medium'>{authUser.fullName}</h3>
                </div>
                {/* Search users */}
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            {/* User List */}
            <div className='overflow-y-auto scrollbar-none'>
                <div className='w-full px-4 py-2 font-medium text-gray-400 bg-base-100'>Users</div>
                {filteredUsers.map((user) => {
                    return (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center gap-3 hover:bg-base-200 w-full p-3 transition-colors ${selectedUser?._id === user._id && "bg-base-300 ring-1 ring-blue-50"}`}>
                            <div className='relative '>
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    className='object-cover rounded-full size-12'
                                    alt={user.name}
                                    onClick={() => setFullScreenView(user.profilePic)}
                                />
                                {onlineUsers.includes(user._id) && <span className='absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-zinc-900'></span>}
                            </div>
                            <div>
                                <div className='font-medium truncate'>{highlightText(user.fullName, searchQuery)}</div>
                            </div>
                        </button>
                    );
                })}
                {filteredUsers.length === 0 && <div className='py-4 text-center text-zinc-500'>No users found</div>}
            </div>
        </aside>
    );
};

export default SideBar;
