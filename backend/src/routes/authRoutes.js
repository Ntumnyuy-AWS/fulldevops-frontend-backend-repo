import express from "express";
import {
    registerUser,
    loginUser,
    getMe,
} from "../controllers/authcontroller.js";
import {protect} from "../middlware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;