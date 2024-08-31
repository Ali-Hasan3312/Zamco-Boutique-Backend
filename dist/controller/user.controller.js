"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUs = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const user_model_1 = require("../models/user.model");
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.contactUs = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { name, email, userId } = req.body;
    const photo = req.file?.path;
    if (!name || !email || !userId || !photo) {
        return next(new errorHandler_1.default("Please fill all the required fields", 400));
    }
    const cloudPhoto = await (0, cloudinary_1.uploadOnCloudinary)(photo);
    const user = await user_model_1.User.create({
        userId,
        name,
        email,
        photo: cloudPhoto,
    });
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user
    });
});
