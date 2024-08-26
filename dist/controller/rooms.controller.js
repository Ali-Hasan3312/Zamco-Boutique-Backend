"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRooms = exports.createRoom = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const room_model_1 = require("../models/room.model");
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createRoom = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { roomReviews, roomType, roomPrice, roomStatus, roomDescription } = req.body;
    if (!roomType || !roomPrice || !roomStatus || !roomDescription) {
        return next(new errorHandler_1.default("Please fill all the fields", 400));
    }
    const photo = req.file?.path;
    if (!photo) {
        return next(new errorHandler_1.default("Please upload a photo", 400));
    }
    const cloudPhoto = await (0, cloudinary_1.uploadOnCloudinary)(photo);
    const room = await room_model_1.Room.create({
        roomReviews,
        roomType,
        roomPrice,
        roomStatus,
        roomDescription,
        photo: cloudPhoto?.url
    });
    res.status(201).json({
        success: true,
        message: "Room created successfully",
        room
    });
});
exports.allRooms = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const rooms = await room_model_1.Room.find({ roomStatus: true });
    res.status(200).json({
        success: true,
        rooms
    });
});
