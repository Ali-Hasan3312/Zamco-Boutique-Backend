import { TryCatch } from "../middleware/error.middleware";
import { UserSubscription } from "../models/userSubscription";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";
export const userSubscription = TryCatch(async (req, res, next) => {
       
        const { email } = req.body;
        if (!email) {
            return next(new ErrorHandler("Please Enter Email", 400));
        }
        const existedEmail = await UserSubscription.findOne({ email });
        if (existedEmail) {
            return next(new ErrorHandler("Email Already Subscribed", 400));
        }
        const message = `The particular Guest Subscribed for Discounts \n Email: ${email} `;
        try {
            await sendEmail({
                email: "alihasan331229@gmail.com",
                subject: `User Subscription`,
                message,
            });
        } catch (error) {
            
            return next(new ErrorHandler("Failed to send email", 500));
        }
       
        const userEmail = await UserSubscription.create({
            
            email,
           
        });

        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            message: "Subscribed Successfully",
            userEmail
        });
   
});
