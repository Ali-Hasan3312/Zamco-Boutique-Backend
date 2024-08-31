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
const node_cron_1 = __importDefault(require("node-cron"));
const booking_1 = require("./models/booking");
const bookingRoute_1 = __importDefault(require("./routes/bookingRoute"));
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const getinTouchRoute_1 = __importDefault(require("./routes/getinTouchRoute"));
const userSubscriptionRoute_1 = __importDefault(require("./routes/userSubscriptionRoute"));
const statsRoute_1 = __importDefault(require("./routes/statsRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./config/config.env" });
const port = process.env.PORT || 3000;
(0, database_1.connectDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
node_cron_1.default.schedule('* * * * *', async () => {
    try {
        const currentDate = new Date();
        // Find all bookings
        const allBookings = await booking_1.Booking.find({}).populate('room'); // Populate room field to get the actual Room document
        // Update room status for each booking based on checkOut date
        for (const booking of allBookings) {
            const room = booking.room;
            if (room) {
                if (booking.checkOut < currentDate) {
                    // If checkout date is in the past, set roomStatus to true
                    room.roomStatus = true;
                }
                else {
                    // If checkout date is in the future, set roomStatus to false
                    room.roomStatus = false;
                }
                await room.save();
            }
        }
    }
    catch (error) {
        console.error('Error updating room status:', error);
    }
});
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
app.use("/api/v1", statsRoute_1.default);
app.use("/api/v1", userRoute_1.default);
app.use(error_middleware_1.errorMiddleware);
