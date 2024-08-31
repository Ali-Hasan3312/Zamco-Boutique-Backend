import express from "express";
import { allBookings, deleteBooking, roomBooking, updatePaymentStatus } from "../controller/booking.controller";

const bookingRouter = express();

bookingRouter.route("/book").post(roomBooking);
bookingRouter.route("/book/getAll").get(allBookings);
bookingRouter.route("/book/updatePayment/:id").put(updatePaymentStatus);
bookingRouter.route("/book/deleteBooking/:id").delete(deleteBooking);


export default bookingRouter;