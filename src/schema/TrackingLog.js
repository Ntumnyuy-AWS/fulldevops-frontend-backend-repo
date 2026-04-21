import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Booking",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", " accepted", "in_transit", "delivered"],
        },

        location: {
            lat: Number,
            lng: Number,
        },

        updateBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    { timestamps: true}
);

export default mongoose.schema("trackingLog", trackingSchema);