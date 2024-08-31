"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
        trim: true,
    },
    checkOut: {
        type: Date,
        required: [true, "Check-out date is required"]
    },
    checkIn: {
        type: Date,
        required: [true, "Check-in date is required"]
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"]
    },
    roomPrice: {
        type: String,
        required: [true, "Room Price is required"]
    },
    roomType: {
        type: String,
        required: [true, "Room Type is required"]
    },
    rooms: {
        type: Number,
        required: [true, "Number of Rooms required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Unpaid"], // Ensure it only accepts "PAID" or "UNPAID"
        default: "Unpaid", // Default to "UNPAID"
    },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
