import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.log("error in getting users for sidebar", err.message);
        res.status(500).send("Internal server error");
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [myId, userToChatId] },
        }).populate("messages");
        if (!conversation) {
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in get messages controller", err.message);
        res.status(500).send("Internal Server Error");
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // upload base64 to clodimary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }
        const newMessage = await Message.create({
            text,
            image: imageUrl,
            senderId,
            receiverId,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (err) {
        console.log("Error in send message controller", err.message);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteMessages = async (req, res) => {
    const { messageIds } = req.body;
    if (!messageIds || !Array.isArray(messageIds)) {
        return res.status(400).json({ message: "Invalid request payload" });
    }
    try {
        await Message.deleteMany({ _id: { $in: messageIds } });
        res.status(200).json({ message: "Messages deleted successfully" });
    } catch (error) {
        console.error("Error deleting messages:", error);
        res.status(500).json({ message: "Failed to delete messages" });
    }
};
