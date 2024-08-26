"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controller/booking.controller");
const bookingRouter = (0, express_1.default)();
bookingRouter.route("/book").post(booking_controller_1.roomBooking);
exports.default = bookingRouter;
