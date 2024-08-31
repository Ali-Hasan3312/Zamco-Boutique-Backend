import express from "express";
import { roomBooking } from "../controller/booking.controller";

const userRouter = express();
userRouter.route("/user/new").post(roomBooking);
export default userRouter;