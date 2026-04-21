import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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

//hash password before save

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("User", userSchema);