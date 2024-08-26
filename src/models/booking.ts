import { Document, model, Schema } from "mongoose";
import { Room } from "./room.model";

export interface Booking extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    checkOut: Date;
    adults: number;
    children?: number;
    room: Room;
    roomStatus: Boolean;
  }
  const BookingSchema = new Schema<Booking>({
   name: {
    type: String,
    required: [true, "Name is required"],
   },
   email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true, 
},
   phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    unique: true,
    trim: true,
   },
    checkOut: {
        type: Date,
        required: [true, "Check-out date is required"]
    },
    adults: {
        type: Number,
        default: 1
    },
    children: {
        type: Number,
        default: 0
    },
    
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"]
    },
  },{timestamps:true});

  export const Booking = model<Booking>("Booking", BookingSchema)