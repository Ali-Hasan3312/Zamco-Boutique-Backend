import { TryCatch } from "../middleware/error.middleware";
import { Booking } from "../models/booking";
import { Room } from "../models/room.model";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

export const roomBooking = TryCatch(async (req, res, next) => {
    try {
        if (!req.body) {
            return next(new ErrorHandler("Request body is missing", 400));
        }
        
        const { name, email, phoneNumber, checkOut, child, adult, roomId } = req.body;

        if (!name || !email || !phoneNumber || !checkOut || !roomId) {
            return next(new ErrorHandler("Please fill all the required fields", 400));
        }

        const allRooms = await Room.find({ roomStatus: true });
        if (allRooms.length === 0) {
            return next(new ErrorHandler("No rooms available", 400));
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return next(new ErrorHandler("No room found with that room type", 404));
        }

        const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nRoom Title: ${room.roomTitle}\nRoom Price: ${room.roomPrice}`;

        try {
            await sendEmail({
                email: email,
                subject: `Room Booking Confirmation`,
                message,
            });
        } catch (error) {
            console.error("Failed to send email:", error);
            return next(new ErrorHandler("Failed to send email", 500));
        }
        room.roomStatus = false;
        await room.save();
        const RoomStatus = room.roomStatus
        console.log(RoomStatus);
        const booking = await Booking.create({
            name,
            email,
            phoneNumber,
            checkOut,
            child,
            adult,
            room: room._id
        });

        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            message: "Room booked successfully",
            booking
        });
    } catch (error) {
        console.error("Error in roomBooking handler:", error);
        next(new ErrorHandler("Internal Server Error", 500));
    }
});
