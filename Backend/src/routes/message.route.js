import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getContacts, getMessages, sendMessage } from "../controllers/message.controller.js";
// import Message from "../models/message.model.js";

const router = express.Router();

router.get("/contacts", protectRoute, getContacts);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage)

export default router;