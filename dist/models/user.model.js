"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    photo: {
        type: String,
        required: [true, "Staff photo is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    designation: {
        type: String,
        default: "Operator",
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
