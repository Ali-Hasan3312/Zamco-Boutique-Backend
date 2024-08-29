import express from "express";
import { allBookings, roomBooking } from "../controller/booking.controller";

const bookingRouter = express();

bookingRouter.route("/book").post(roomBooking);
bookingRouter.route("/book/getAll").get(allBookings);


export default bookingRouter;