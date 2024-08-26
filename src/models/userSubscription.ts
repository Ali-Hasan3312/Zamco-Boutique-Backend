import { Document, model, Schema } from "mongoose";

export interface SubscriptionType extends Document {
   
    email: string;
   
   
  }
  const userSubscriptionSchema = new Schema<SubscriptionType>({
  
   email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true, 
},
  
  
  },{timestamps:true});

  export const UserSubscription = model<SubscriptionType>("UserSubscription", userSubscriptionSchema)