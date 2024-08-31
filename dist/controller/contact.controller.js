"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMail = exports.allMails = exports.contactUs = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const contact_model_1 = require("../models/contact.model");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.contactUs = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
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
});
exports.allMails = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const mails = await contact_model_1.Contact.find().sort({ createdAt: -1 });
    // Update the roomStatus to false
    res.status(201).json({
        success: true,
        mails
    });
});
exports.deleteMail = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const mail = await contact_model_1.Contact.findById(req.params.id);
    if (!mail)
        return next(new errorHandler_1.default("Mail not found", 404));
    await mail.deleteOne();
    res.status(201).json({
        success: true,
        message: "Mail Deleted Successfully"
    });
});
