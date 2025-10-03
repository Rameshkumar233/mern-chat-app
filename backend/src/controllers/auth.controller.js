import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            await sendVerificationEmail(newUser.email, verificationToken);
            res.status(201).json({
                ...newUser._doc,
                password: undefined,
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in sign up controller:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: "Invalid or Expired code" });

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.fullName.toUpperCase());

        res.status(200).json({ ...user._doc, password: undefined });
    } catch (error) {
        console.log("Error verifying email", error.message);
        return res.status(500).json({ messsage: "Internal server error." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        generateToken(user._id, res);
        res.status(201).json({
            ...user._doc,
            password: undefined,
        });
    } catch (error) {
        console.log("Error in Login controller:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logout controller:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ message: "Account deleted successfully." });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            user.profilePic = uploadResponse.secure_url;
        }
        if (fullName) {
            user.fullName = fullName;
        }
        // Remove the existing profile picture if requested
        if (!profilePic && !fullName) {
            if (user.profilePic) {
                const publicId = user.profilePic.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
                user.profilePic = "";
            }
        }
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updating profile:", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checking auth status:", error.message);
        res.status(500).json({ message: "Internal server Error" });
    }
};
