import express from "express";
import { roomBooking } from "../controller/booking.controller";

const bookingRouter = express();

bookingRouter.route("/book").post(roomBooking)

export default bookingRouter;