"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    roomDescription: {
        type: String,
        required: [true, "Room description is required"]
    },
    roomPrice: {
        type: Number,
        required: [true, "Room price is required"]
    },
    roomType: {
        type: String,
        required: [true, "Room number is required"]
    },
    roomReviews: {
        type: Number,
        default: 5
    },
    roomStatus: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String,
        required: [true, "Room photo is required"]
    }
}, { timestamps: true });
exports.Room = (0, mongoose_1.model)("Room", RoomSchema);
