import mongoose from "mongoose";

const itemschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        weight: Number,
        quantity: {
            type:Number,
            default: 1,
        },
        fragile: {
            type: Boolean,
            default: false,
        },
        description: String,
    },
    { timestamp: true}
);

export default mongoose.model("Item", itemschema);