import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db/database.";
import { errorMiddleware } from "./middleware/error.middleware";
import roomsRouter from "./routes/roomsRouter";
import { Room } from "./models/room.model";
import cron from 'node-cron';
import { Booking } from "./models/booking";
import bookingRouter from "./routes/bookingRoute";
import contactRouter from "./routes/contact.route";
import getInTouchRouter from "./routes/getinTouchRoute";
import userSubscriptionRouter from "./routes/userSubscriptionRoute";
const app = express()
dotenv.config({path: "./config/config.env"})

const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cron.schedule('* * * * * *', async () => {  // This will run every second
//   try {
//       const currentDate = new Date();
      
//       // Find all bookings where the checkout date is less than the current date
//       const expiredBookings = await Booking.find({
//           checkOut: { $lt: currentDate },
//       });
      
      
      
//       // Update the room status for each expired booking

//       // Update room status for each expired booking
//       for (const booking of expiredBookings) {
//           const room = await Room.findById(booking.room);
//           if (room) {
//               room.roomStatus = true;
//               await room.save();
//           }
//       }

      
//   } catch (error) {
//       console.error('Error updating room status:', error);
//   }
// });
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

app.use("/api/v1",roomsRouter)
app.use("/api/v1",bookingRouter)
app.use("/api/v1",contactRouter)
app.use("/api/v1",getInTouchRouter)
app.use("/api/v1",userSubscriptionRouter)

app.use(errorMiddleware)