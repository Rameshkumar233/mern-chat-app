import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/SideBarSkeleton";
import Search from "./Search";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const SideBar = () => {
    const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
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
        <aside className={`flex flex-col h-full transition-all duration-300 sm:border-r md:w-80 sm:w-72 sm:border-base-300 ${selectedUser && "hidden sm:block"}`}>
            <div className='w-full p-5 border-b border-base-200'>
                {/* Header */}
                <div className='flex items-center gap-x-3'>
                    <Users className='size-6' />
                    <span className='font-medium '>Chats</span>
                </div>
                {/* Search users */}
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            {/* User List */}
            <div className='py-3 overflow-y-auto scrollbar-none'>
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
