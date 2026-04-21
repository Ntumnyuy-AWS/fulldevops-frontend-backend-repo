import express from "express";
import {
    createBooking,
    getBooking,
    getBookingById,
    assignDriver,
    updateBookingByStatus,
    trackBooking,
} from "../controllers/bookingController.js"
import { protect, authorize } from "../middlware/authMiddleware.js";

const router = express.Router();

// customer

router.post("/", protect, createBooking);
router.get("/", protect, getBooking);
router.get("/:id", protect, getBookingById);

// Admin
router.put("/:id/assign-driver", protect, authorize("admin"), assignDriver)

//Driver
router.put("/:id/status", protect, authorize("driver"), updateBookingByStatus);

//Tracking
router.get("/:id/tracking", protect, trackBooking);

export default router;