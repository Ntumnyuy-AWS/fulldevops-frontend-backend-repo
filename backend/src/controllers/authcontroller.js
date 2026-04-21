import User from "../schema/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generatetoken.js";

//register user 
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role} = req.body;

    const userExists = await User.findOne({ email})

    if (userExists) {
        res.status(400);
        throw new Error ("user already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    });
});

// login user

export const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    }else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// get current user 

export const getMe = asyncHandler(async (req, res) => {
    res.json(req.user);
});




