import { Document, model, Schema } from "mongoose";
import { Room } from "./room.model";

export interface UserTypes extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
  }
  const userSchema = new Schema<UserTypes>({
    _id: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
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
role: {
    type: String,
    default: "operator",
},
  
  },{timestamps:true});

  export const User = model<UserTypes>("User", userSchema)