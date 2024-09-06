import { Document, model, Schema } from "mongoose";

export interface UserTypes extends Document {
    photo: string;
    name: string;
    designation?: string; // Example of an optional field
    mobile: string;
    email: string;
    address: string; 
    joiningDate?: Date; 
    dateOfBirth?: Date; 
}

const userSchema = new Schema<UserTypes>({
    photo: {
        type: String,
        required: [true, "Staff photo is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    designation: {
        type: String,
        default: "Operator",
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
         required: [true, "Address is required"],
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
}, { timestamps: true });

export const User = model<UserTypes>("User", userSchema);
