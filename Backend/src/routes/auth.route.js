import express from "express";
import { signup, signin, signout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.patch("/update-profile", protectRoute, updateProfile);

export default router;