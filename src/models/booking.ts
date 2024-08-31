import { Document, model, Schema } from "mongoose";
import { Room } from "./room.model";
type PaymentStatus = "Paid" | "Unpaid";
export interface Booking extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    checkIn: Date;
    checkOut: Date;
    room: Room;
    roomPrice: string;
    roomType: string;
    rooms: number;
    discount: number;
    paymentStatus: PaymentStatus;
  }
  const BookingSchema = new Schema<Booking>({
   name: {
    type: String,
    required: [true, "Name is required"],
   },
   email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true, 
},
   phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    trim: true,
   },
    checkOut: {
        type: Date,
        required: [true, "Check-out date is required"]
    },
    checkIn: {
        type: Date,
        required: [true, "Check-in date is required"]
    },
   
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"]
    },
    roomPrice: {
        type: String,
        required: [true, "Room Price is required"]
    },
    roomType: {
        type: String,
        required: [true, "Room Type is required"]
    },
    rooms: {
        type: Number,
        required: [true, "Number of Rooms required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Unpaid"],  // Ensure it only accepts "PAID" or "UNPAID"
        default: "Unpaid",         // Default to "UNPAID"
      },
  },{timestamps:true});

  export const Booking = model<Booking>("Booking", BookingSchema)