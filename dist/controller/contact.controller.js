"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUs = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const contact_model_1 = require("../models/contact.model");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.contactUs = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    try {
        if (!req.body) {
            return next(new errorHandler_1.default("Request body is missing", 400));
        }
        const { name, email, phoneNumber, userMessage } = req.body;
        if (!name || !email || !phoneNumber || !userMessage) {
            return next(new errorHandler_1.default("Please fill all the required fields", 400));
        }
        const message = `The particular Guest wants to send communicate with you \n Name: ${name}\nEmail: ${email} \nPhone: ${phoneNumber}\n  ${userMessage}`;
        try {
            await (0, sendEmail_1.default)({
                email: "alihasan331229@gmail.com",
                subject: `${name} Wants To Communicate`,
                message,
            });
        }
        catch (error) {
            console.error("Failed to send email:", error);
            return next(new errorHandler_1.default("Failed to send email", 500));
        }
        const contact = await contact_model_1.Contact.create({
            name,
            email,
            phoneNumber,
            userMessage,
        });
        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact
        });
    }
    catch (error) {
        console.error("Error in roomBooking handler:", error);
        next(new errorHandler_1.default("Internal Server Error", 500));
    }
});
