import mongoose from "mongoose";
const userSchema = new mongoose.schema({
    name: {
        type: String,
        request: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        enum: ["customer", "driver", "admin"],
        default: "customer"
    },
    phone: String,

    //Driver specific fields
    vehicleType: String,
    licenseNumber: String,
    isAvailable: {
        type: Boolean,
        default: true,
    },
},
{timestamps: true}
);

export default mongoose.schema("User", userSchema);