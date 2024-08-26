import { Document, model, Schema } from "mongoose";

export interface Contact extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    userMessage: string;
   
  }
  const ContactSchema = new Schema<Contact>({
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
   userMessage: {
    type: String,
    required: [true, "Message is required"],
   },
  
  },{timestamps:true});

  export const Contact = model<Contact>("Contact", ContactSchema)