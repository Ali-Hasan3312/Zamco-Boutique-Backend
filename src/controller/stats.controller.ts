import { TryCatch } from "../middleware/error.middleware";
import { Booking } from "../models/booking";
import { Room } from "../models/room.model";
import ErrorHandler from "../utils/errorHandler";


export const getDashboardStats = TryCatch(async(req,res,next)=>{
    let stats = {};
    const today = new Date();
    const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0); // Start of today

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999); // End of today
    const tenMonthsAgo = new Date();
    tenMonthsAgo.setMonth(tenMonthsAgo.getMonth() - 10);
    tenMonthsAgo.setHours(0, 0, 0, 0);
    const thisMonth = {
        start: new Date(today.getFullYear(),today.getMonth(),1),
        end: today
    };
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)
    
    // Adjust to get the start of the week (Monday)
    const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
    startOfWeek.setDate(today.getDate() - distanceToMonday);
    
    // Ensure the start time is at the beginning of the day
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(today);
    // Ensure the end time is at the end of the current day
    endOfWeek.setHours(23, 59, 59, 999);
    
    const thisWeek = {
        start: startOfWeek,
        end: endOfWeek
    };
    const thisMonthBookingsPromise = Booking.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });
      const todayBookingsPromise = await Booking.find({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
      const thisweekBookingsPromise = Booking.find({
        createdAt: {
          $gte: thisWeek.start,
          $lte: thisWeek.end,
        },
      })

      const availableRoomsCountPromise = Room.countDocuments({ roomStatus: true }); 
      const bookingCountPromise = Booking.countDocuments({
        createdAt: {
            $gte: thisMonth.start,
            $lte: thisMonth.end,
          },
      });
      const tenMonthsBookingsPromise = await Booking.aggregate([
        {
          $match: {
              createdAt: { $gte: tenMonthsAgo } // Filter bookings within the last 10 months
          }
      },
      {
          $group: {
              _id: {
                  month: { $month: "$createdAt" },
                  year: { $year: "$createdAt" }
              },
              totalBookings: { $sum: 1 }
          }
      },
      {
          $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
      }
    ]);
      const [
        availableRoomsCount,
        bookingsCount,
        thisMonthBookings,
        tenMonthsBookings,
        thisweekBookings,
        todayBookings
      ] = await Promise.all([
        availableRoomsCountPromise,
        bookingCountPromise,
        thisMonthBookingsPromise,
        tenMonthsBookingsPromise,
        thisweekBookingsPromise,
        todayBookingsPromise
    ]);
    const thisMonthRevenue = thisMonthBookings.reduce((total, booking) => {
      // Convert roomPrice to a number, or use 0 if it can't be converted
      const roomPrice = parseFloat(booking.roomPrice) || 0;
      return total + roomPrice;
  }, 0);
    const thisWeekRevenue = thisweekBookings.reduce((total, booking) => {
      // Convert roomPrice to a number, or use 0 if it can't be converted
      const roomPrice = parseFloat(booking.roomPrice) || 0;
      return total + roomPrice;
  }, 0);
    const todayRevenue = todayBookings.reduce((total, booking) => {
      // Convert roomPrice to a number, or use 0 if it can't be converted
      const roomPrice = parseFloat(booking.roomPrice) || 0;
      return total + roomPrice;
  }, 0);

  stats = {
    availableRoomsCount,
    bookingsCount,
    tenMonthsBookings,
    thisMonthRevenue,
    thisWeekRevenue,
    todayRevenue
  }
  if(!stats){
    return next(new ErrorHandler("Stats not  found", 400));
  }
  res.status(201).json({
    success: true,
    stats
   });
});