"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        default: "operator",
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
