import React, { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { Camera, Mail, User, Check, Pencil } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { EmojiPicker } from "../components/EmojiPicker";
import ConfirmationModal from "../components/ConfirmationModal";
import { useChatStore } from "../store/useChatStore";

const ProfilePage = () => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
    const { authUser, isUpdatingProfile, updateProfile, deleteAccount } = useAuthStore();
    const { setFullScreenView } = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const [fullName, setFullName] = useState(authUser?.fullName);
    const [isEditing, setIsEditing] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const imageFileRef = useRef();
    const editRef = useRef(null);

    useEffect(() => {
        if (!isEditing) {
            editRef.current?.focus();
        }
    }, [isEditing]);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const options = {
            maxSizeMB: 1,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        // Check file size
        if (compressedFile.size > MAX_FILE_SIZE) {
            toast.error("File size exceeds 2MB. Please upload a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };
    const handleRemoveProfile = async () => {
        try {
            if (authUser.profilePic) {
                await updateProfile({ profilePic: null });
                setSelectedImg(null);
            }
        } catch (error) {
            console.error("Error removing profile:", error);
        }
    };
    const handleEdit = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (fullName.length >= 3) {
            setIsEditing(true);
            await updateProfile({ fullName });
        }
    };

    const handleDeleteAccount = () => {
        deleteAccount();
    };

    return (
        <div className='min-h-screen pt-20'>
            <div className='max-w-md px-4 py-8 mx-auto min-w-max'>
                <div className='p-6 space-y-5 bg-base-200 rounded-xl'>
                    {/* Title and Description */}
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold text-primary'>Profile</h1>
                        <p>Your Profile Information</p>
                    </div>
                    {/* Upload Section */}
                    <div className='flex flex-col items-center justify-center gap-y-4'>
                        <div className='relative'>
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt='Profile'
                                className='object-cover border-4 rounded-full size-32'
                                onClick={() => setFullScreenView(authUser.profilePic)}
                            />
                            {/* Add the camera icon for editing or deleting profile */}
                            {authUser.profilePic ? (
                                <div
                                    tabIndex={0}
                                    className={`absolute bottom-0 right-0 rounded-full p-2 bg-base-content transition-all duration-300 ease-in-out dropdown dropdown-bottom ${
                                        isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                                    }`}>
                                    <label className='cursor-pointer hover:scale-110'>
                                        <Camera className='size-7 text-base-200 ' />
                                    </label>
                                    <ul className='z-10 w-40 p-2 shadow menu dropdown-content bg-base-100 rounded-box'>
                                        <li>
                                            <a onClick={() => imageFileRef.current.click()}>Change Profile</a>
                                            <input
                                                type='file'
                                                ref={imageFileRef}
                                                id='avatar-upload'
                                                className='hidden'
                                                accept='image/*'
                                                onChange={handleImageUpload}
                                                disabled={isUpdatingProfile}
                                            />
                                        </li>
                                        <li>
                                            <a onClick={handleRemoveProfile}>Remove Profile</a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <label
                                    htmlFor='avatar-upload'
                                    className={`absolute bottom-0 right-0 rounded-full cursor-pointer hover:scale-110 p-2 bg-base-content transition-all duration-300 ease-in-out ${
                                        isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                                    }`}>
                                    <Camera className='size-7 text-base-200' />
                                    <input
                                        type='file'
                                        id='avatar-upload'
                                        className='hidden'
                                        accept='image/*'
                                        onChange={handleImageUpload}
                                        disabled={isUpdatingProfile}
                                    />
                                </label>
                            )}
                        </div>
                        <p className='text-sm text-zinc-400'>{isUpdatingProfile ? "Updating Profile..." : ""}</p>
                    </div>
                    {/* Profile Details */}
                    <div className='space-y-6'>
                        <div className='space-y-1.5'>
                            <div className='flex items-center gap-2 text-sm text-zinc-400'>
                                <User className='size-4' />
                                Full Name
                            </div>
                            {/* Editable Full Name Field */}
                            <div className={`pl-4 py-2.5 rounded-lg flex items-center justify-between border  ${!isEditing ? "border-green-500" : "border-slate-700"}`}>
                                <input
                                    ref={editRef}
                                    className='outline-none bg-base-200 w-[75%]'
                                    type='text'
                                    value={fullName}
                                    maxLength={30}
                                    minLength={5}
                                    onChange={(e) => setFullName(e.target.value)}
                                    readOnly={isEditing}
                                />
                                <div className='whitespace-nowrap'>
                                    {!isEditing && <EmojiPicker setText={setFullName} />}
                                    <span
                                        className='btn btn-sm'
                                        onClick={isEditing ? handleEdit : handleSave}>
                                        {isEditing ? <Pencil /> : <Check />} {/* Toggle icons */}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Email Address */}
                        <div className='space-y-1.5'>
                            <div className='flex items-center gap-2 text-sm text-zinc-400'>
                                <Mail className='size-4' />
                                Email Address
                            </div>
                            <p className='px-4 py-2.5 bg-base-200 rounded-lg border border-slate-700'>{authUser?.email}</p>
                        </div>
                    </div>
                    {/* Account Info */}
                    <div className='p-6 mt-6 bg-base-300 rounded-xl'>
                        <h2 className='mb-4 text-lg font-medium'>Account Information</h2>
                        <div className='space-y-3 text-sm'>
                            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <span>Account Status</span>
                                <span className='text-green-500'>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Delete Account Button */}
                <div className='p-5 text-center text-red-500'>
                    <button onClick={() => setOpenModal(true)}>Delete Account</button>
                </div>
                {/* Confirmation Modal */}
                <ConfirmationModal
                    handleDelete={handleDeleteAccount}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    title='Delete Account'
                    message='Do you want to delete your account?'
                />
            </div>
        </div>
    );
};

export default ProfilePage;
