import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split("") [1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        }catch (error) {
            res.status(401);
            throw new Error("not authorized, token failed")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("not authaurized,  no token")
    }
});

//role based access 

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error("Access denied");
        }
        next();
    };
};