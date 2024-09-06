"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStaff = exports.deleteStaff = exports.updateStaff = exports.newStaff = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const user_model_1 = require("../models/user.model");
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.newStaff = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { name, email, address, mobile, dateOfBirth } = req.body;
    const photo = req.file?.path;
    if (!name || !email || !photo || !address || !mobile || !dateOfBirth) {
        return next(new errorHandler_1.default("Please fill all the required fields", 400));
    }
    const cloudPhoto = await (0, cloudinary_1.uploadOnCloudinary)(photo);
    const user = await user_model_1.User.create({
        name,
        email,
        address,
        mobile,
        dateOfBirth,
        photo: cloudPhoto?.url,
    });
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user
    });
});
exports.updateStaff = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const user = await user_model_1.User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 400));
    }
    res.status(200).json(user);
});
exports.deleteStaff = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const user = await user_model_1.User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new errorHandler_1.default("User not found", 400));
    }
    res.status(200).json({ message: "User deleted successfully" });
});
exports.getAllStaff = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const users = await user_model_1.User.find();
    res.status(200).json(users);
    res.status(201).json({
        success: true,
        users
    });
});
