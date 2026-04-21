import mongoose from "mongoose";

const locationschema = new mongoose.Schema (
    {
        address: {
            type: String,
            required: true,
        },
        city: String,
        state: String,
        country: String,

        coordinates: {
            lat: Number,
            lng: Number,
        }
    },
    { timestamps: true}
);

export default mongoose.schema("location", locationschema);