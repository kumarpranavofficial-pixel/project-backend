import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new AppError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken');
        if (!user) {
            throw new AppError(401, "Invalid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new AppError(401, "Invalid access token");
    }
});