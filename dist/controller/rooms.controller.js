"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatRoom = exports.deleteRoom = exports.getAllRooms = exports.allRooms = exports.createRoom = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const room_model_1 = require("../models/room.model");
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createRoom = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { roomType, roomPrice, roomStatus, roomDescription } = req.body;
    if (!roomType || !roomPrice || !roomStatus || !roomDescription) {
        return next(new errorHandler_1.default("Please fill all the fields", 400));
    }
    const photo = req.file?.path;
    if (!photo) {
        return next(new errorHandler_1.default("Please upload a photo", 400));
    }
    const cloudPhoto = await (0, cloudinary_1.uploadOnCloudinary)(photo);
    const room = await room_model_1.Room.create({
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
exports.getAllRooms = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const rooms = await room_model_1.Room.find();
    res.status(200).json({
        success: true,
        rooms
    });
});
exports.deleteRoom = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const room = await room_model_1.Room.findById(id);
    if (!room) {
        return next(new errorHandler_1.default("Room not found", 404));
    }
    await room.deleteOne();
    res.status(200).json({
        success: true,
        message: "Room deleted successfully"
    });
});
exports.updatRoom = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const room = await room_model_1.Room.findById(id);
    console.log(id);
    if (!room) {
        return next(new errorHandler_1.default("Room not found", 404));
    }
    const { roomType, roomPrice, roomStatus, roomDescription } = req.body;
    console.log(roomPrice);
    if (!roomType && !roomPrice && !roomStatus && !roomDescription) {
        return next(new errorHandler_1.default("Please fill atleast one field", 400));
    }
    const photo = req.file?.path;
    if (photo) {
        const cloudPhoto = await (0, cloudinary_1.uploadOnCloudinary)(photo);
        if (!cloudPhoto?.url) {
            throw new Error("Failed to upload photo to Cloudinary");
        }
        room.photo = cloudPhoto.url;
    }
    if (roomType) {
        room.roomType = roomType;
    }
    if (roomPrice) {
        room.roomPrice = roomPrice;
    }
    if (roomStatus) {
        room.roomStatus = roomStatus;
    }
    if (roomDescription) {
        room.roomDescription = roomDescription;
    }
    await room.save();
    res.status(200).json({
        success: true,
        message: "Room updated successfully",
        room
    });
});
