import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    driver: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
        }
    ],

    pickuplocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    deliverylocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    scheduleDate: Date,

    status: {
        type: String,
        enum: ["pending", "accepted", "in_transit", "delivered", "cancelled"],
        default: "pending",
    },

    price: Number,
},
{ timestamps: true}
);

export default mongoose.schema("Booking", bookingSchema);