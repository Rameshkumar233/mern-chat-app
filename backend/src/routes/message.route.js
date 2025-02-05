import { Router } from "express";
import { getMessages, getUsersForSidebar, sendMessage, deleteMessages } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/messages/users", protectRoute, getUsersForSidebar);
router.get("/messages/:id", protectRoute, getMessages);
router.post("/messages/send/:id", protectRoute, sendMessage);
router.post("/messages/delete", protectRoute, deleteMessages);

export default router;
