"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const ContactSchema = new mongoose_1.Schema({
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
    userMessage: {
        type: String,
        required: [true, "Message is required"],
    },
}, { timestamps: true });
exports.Contact = (0, mongoose_1.model)("Contact", ContactSchema);
