"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomBooking = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const booking_1 = require("../models/booking");
const room_model_1 = require("../models/room.model");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.roomBooking = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    try {
        if (!req.body) {
            return next(new errorHandler_1.default("Request body is missing", 400));
        }
        const { name, email, phoneNumber, checkOut, child, adult, roomId } = req.body;
        if (!name || !email || !phoneNumber || !checkOut || !roomId) {
            return next(new errorHandler_1.default("Please fill all the required fields", 400));
        }
        const allRooms = await room_model_1.Room.find({ roomStatus: true });
        if (allRooms.length === 0) {
            return next(new errorHandler_1.default("No rooms available", 400));
        }
        const room = await room_model_1.Room.findById(roomId);
        if (!room) {
            return next(new errorHandler_1.default("No room found with that room type", 404));
        }
        const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nRoom Title: ${room.roomTitle}\nRoom Price: ${room.roomPrice}`;
        try {
            await (0, sendEmail_1.default)({
                email: email,
                subject: `Room Booking Confirmation`,
                message,
            });
        }
        catch (error) {
            console.error("Failed to send email:", error);
            return next(new errorHandler_1.default("Failed to send email", 500));
        }
        room.roomStatus = false;
        await room.save();
        const RoomStatus = room.roomStatus;
        console.log(RoomStatus);
        const booking = await booking_1.Booking.create({
            name,
            email,
            phoneNumber,
            checkOut,
            child,
            adult,
            room: room._id
        });
        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            message: "Room booked successfully",
            booking
        });
    }
    catch (error) {
        console.error("Error in roomBooking handler:", error);
        next(new errorHandler_1.default("Internal Server Error", 500));
    }
});
