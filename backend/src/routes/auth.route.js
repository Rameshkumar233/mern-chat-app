import express from "express";
import { signup, login, logout, deleteAccount, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.delete("/auth/delete-account", protectRoute, deleteAccount);

router.put("/auth/update-profile", protectRoute, updateProfile);
router.get("/auth/check", protectRoute, checkAuth);

export default router;
