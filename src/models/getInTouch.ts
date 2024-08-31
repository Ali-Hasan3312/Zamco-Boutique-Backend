import { Document, model, Schema } from "mongoose";

export interface GetTouch extends Document {
    name: string;
    email: string;
    phoneNumber: string;
   
   
  }
  const ContactSchema = new Schema<GetTouch>({
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
  },{timestamps:true});

  export const GetTouch = model<GetTouch>("GetTouch", ContactSchema)