import Booking from "../schema/Booking.js";
import item from "../schema/Item.js";
import { io } from "../../server.js"
import Location from "../schema/Location.js";
import TrackingLog from "../schema/TrackingLog.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBooking } from "../validators/bookingValidators.js";


// create booking
export const createBooking = asyncHandler(async(req, res) => {
    const error = validateBooking(req.Booking);
    if (error) {
        res.status(400);
        throw new Error(error)
    }

    const { items, pickupLocation, deliveryLocation, scheduleDate } = req.body;

    //create location
    const Pickup = await Location.create(pickupLocation);
    const delivery = await Location.create(deliveryLocation);

    // create items
    const createdItems = await Item.insertMany(items);

    // create booking
    const booking = await booking.create({
        customer: req.user._id,
        items: createdItems.map(i => i._id),
        pickupLocation: Pickup._id,
        deliveryLocation: delivery._id,
        scheduleDate,
    });

    // create initial tracking log
    await TrackingLog.create({
        booking: booking._id,
        status: "pending",
        updateBy: req.user._id,
    });

    res.status(201).json(booking)

});

// get single booking (user-specific) 
export const getBooking = asyncHandler(async(req, res) => {
    const bookings = await Booking.find({ cutomer: req.user._id})
    .populate("items")
    .populate("pickupLocation")
    .populate("deliveryLocation")
    .populate("driver", "name email");

    res.json(bookings);
})


// get single booking 
export const getBookingById = asyncHandler(async(req, res) => {
    const booking = await Booking.findById(req.params.id)
    .populate("items")
    .populate("pickupLocation")
    .populate("deliveryLocation")
    .populate("driver", "name email");

    if (!booking) {
        res.status(404);
        throw new Error("Booking not found");
    };

    res.json(booking)
});

// Assign driver (admin)

export const assignDriver = asyncHandler(async(req, res) => {
    const { driverId } = req.body;

    const booking = await Booking.findById(req.params._id);
    if (!booking) {
        res.status(404);
        throw new Error("Booking not found");
    }

    booking.driver = driverId;
    booking.status = "accepted";

    await booking.save();

    io.to(booking._id.toString()).emit("bookingUpdated", {
        booking: booking._id,
        status: "accepted",
    });

    await TrackingLog.create({
        booking: booking._id,
        status: "accepted",
        updateBy: req.user._id,
    });

    res.json({ message: "Driver Assigned", booking});
});

//  update booking status (Driver)

export const updateBookingByStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        res.status(404);
        throw new Error("Booking not found");
    }

    booking.status = status;
    await booking.save();

    await TrackingLog.create({
        booking: booking._id,
        status,
        updateBy: req.user._id,
    });

    // emit real-time update
    io.to(booking._id.toString()).emit("bookingUpdated", {
        bookingId: booking._id,
        status,
    });

    await TrackingLog.create({
        booking: booking._id,
        status,
        updateBy: req.user._id,
    });

    res.json({ message: "status updated", booking})
});

// Track booking

export const trackBooking = asyncHandler(async (req, res) => {
    const logs = await TrackingLog.find({ booking: req.params.id })
    .sort({ createdAt: 1 })
    .populate("updateBy", "name role");

    res.json(logs);
});