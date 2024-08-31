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
import statsRouter from "./routes/statsRoute";
import userRouter from "./routes/userRoute";
const app = express()
dotenv.config({path: "./config/config.env"})

const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cron.schedule('* * * * *', async () => {  // This will run every minute
    try {
        const currentDate = new Date();
  
        // Find all bookings
        const allBookings = await Booking.find({}).populate('room'); // Populate room field to get the actual Room document
  
        // Update room status for each booking based on checkOut date
        for (const booking of allBookings) {
            const room = booking.room;
            if (room) {
                if (booking.checkOut < currentDate) {
                    // If checkout date is in the past, set roomStatus to true
                    room.roomStatus = true;
                } else {
                    // If checkout date is in the future, set roomStatus to false
                    room.roomStatus = false;
                }
                await room.save();
            }
        }
        
    } catch (error) {
        console.error('Error updating room status:', error);
    }
  });
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
app.use("/api/v1",statsRouter)
app.use("/api/v1",userRouter)

app.use(errorMiddleware)