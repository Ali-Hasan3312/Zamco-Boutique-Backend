import { TryCatch } from "../middleware/error.middleware";
import { Booking } from "../models/booking";
import { Room } from "../models/room.model";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

export const roomBooking = TryCatch(async (req, res, next) => {
    const { name, email, phoneNumber, checkOut, checkIn, roomId, rooms } = req.body;

    if (!name || !email || !phoneNumber || !checkOut || !checkIn || !roomId || !rooms) {
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

    const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nRoom Title: ${room.roomType}\nRoom Price: ${room.roomPrice}`;

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

    try {
        const booking = await Booking.create({
            name,
            email,
            phoneNumber,
            checkIn,
            checkOut,
            rooms,
            room: room._id,
            roomPrice: room.roomPrice,
            roomType: room.roomType
        });

        res.status(201).json({
            success: true,
            message: "Room booked successfully",
            booking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return next(new ErrorHandler("Failed to create booking", 500));
    }
});
export const allBookings = TryCatch(async (req, res, next) => {
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setHours(0, 0, 0, 0);
    const booking = await Booking.find({
        createdAt: { $gte: sixMonthsAgo },
    }).sort({ createdAt: -1 })
     
        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            booking
        });
   
});
export const updatePaymentStatus = TryCatch(async(req, res, next)=>{
    const {id} = req.params;
   
    const booking = await Booking.findById(id);
    if(!booking){
        return next(new ErrorHandler("Booking not found", 404));
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
           id, 
        req.body, 
        { new: true }
      );
    res.status(201).json({
        success: true,
        message: "Booking updated successfully",
        updatedBooking
    })
});
export const deleteBooking = TryCatch(async (req, res, next) => {
    const booking =  await Booking.findById(req.params.id)
       if(!booking) return next(new ErrorHandler("Booking not found", 404))
        const room = await Room.findById(booking.room)
    if(room){
        room.roomStatus = true;
        await room.save()
    }
        
        await booking.deleteOne()
        res.status(201).json({
            success: true,
            message: "Booking Deleted Successfully"
        });
   
});

