"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInTouch = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const getInTouch_1 = require("../models/getInTouch");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.getInTouch = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { name, email, phoneNumber } = req.body;
    if (!name || !email || !phoneNumber) {
        return next(new errorHandler_1.default("Please fill all the required fields", 400));
    }
    const message = `The particular Guest wants to send communicate with you \n Name: ${name}\nEmail: ${email} \nPhone: ${phoneNumber}`;
    try {
        await (0, sendEmail_1.default)({
            email: "alihasan331229@gmail.com",
            subject: `${name} Wants To Communicate`,
            message,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default("Failed to send email", 500));
    }
    const touch = await getInTouch_1.GetTouch.create({
        name,
        email,
        phoneNumber,
    });
    // Update the roomStatus to false
    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        touch
    });
});
