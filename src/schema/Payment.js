import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        method: {
            type: String,
            enum: ["card", "cash", "wallet"],
        },

        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },

        transactionId: String,
    },
    { timestamps: true }
);

export default mongoose.schema("Payment", paymentSchema);