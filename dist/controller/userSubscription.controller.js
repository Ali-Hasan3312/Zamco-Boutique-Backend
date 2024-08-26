"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSubscription = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const userSubscription_1 = require("../models/userSubscription");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
exports.userSubscription = (0, error_middleware_1.TryCatch)(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new errorHandler_1.default("Please Enter Email", 400));
    }
    const existedEmail = await userSubscription_1.UserSubscription.findOne({ email });
    if (existedEmail) {
        return next(new errorHandler_1.default("Email Already Subscribed", 400));
    }
    const message = `The particular Guest Subscribed for Discounts \n Email: ${email} `;
    try {
        await (0, sendEmail_1.default)({
            email: "alihasan331229@gmail.com",
            subject: `User Subscription`,
            message,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default("Failed to send email", 500));
    }
    const userEmail = await userSubscription_1.UserSubscription.create({
        email,
    });
    // Update the roomStatus to false
    res.status(201).json({
        success: true,
        message: "Subscribed Successfully",
        userEmail
    });
});
