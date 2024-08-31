"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controller/booking.controller");
const bookingRouter = (0, express_1.default)();
bookingRouter.route("/book").post(booking_controller_1.roomBooking);
bookingRouter.route("/book/getAll").get(booking_controller_1.allBookings);
bookingRouter.route("/book/updatePayment/:id").put(booking_controller_1.updatePaymentStatus);
bookingRouter.route("/book/deleteBooking/:id").delete(booking_controller_1.deleteBooking);
exports.default = bookingRouter;
