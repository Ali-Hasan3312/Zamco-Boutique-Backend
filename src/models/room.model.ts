import { Document, model, Schema } from "mongoose";

export interface Room extends Document {
  roomTitle: string;
  roomDescription: string;
  roomType: string;
  roomStatus: boolean;
  roomPrice: number;
  roomReviews: number;
  photo: string;
  }

  const RoomSchema = new Schema<Room>({
    roomDescription: {
        type: String,
        required: [true, "Room description is required"]
    },
    roomPrice: {
        type: Number,
        required: [true, "Room price is required"]
    },
    roomType: {
        type: String,
        required: [true, "Room number is required"]
    },
    roomReviews: {
        type: Number,
        default: 5
    },
    roomStatus: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String,
        required: [true, "Room photo is required"]
    }
   
  },{timestamps:true});

  export const Room = model<Room>("Room", RoomSchema)