"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./db/database.");
const error_middleware_1 = require("./middleware/error.middleware");
const roomsRouter_1 = __importDefault(require("./routes/roomsRouter"));
const bookingRoute_1 = __importDefault(require("./routes/bookingRoute"));
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const getinTouchRoute_1 = __importDefault(require("./routes/getinTouchRoute"));
const userSubscriptionRoute_1 = __importDefault(require("./routes/userSubscriptionRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./config/config.env" });
const port = process.env.PORT || 3000;
(0, database_1.connectDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use("/api/v1", roomsRouter_1.default);
app.use("/api/v1", bookingRoute_1.default);
app.use("/api/v1", contact_route_1.default);
app.use("/api/v1", getinTouchRoute_1.default);
app.use("/api/v1", userSubscriptionRoute_1.default);
app.use(error_middleware_1.errorMiddleware);
