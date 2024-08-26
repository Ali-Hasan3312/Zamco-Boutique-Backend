import { TryCatch } from "../middleware/error.middleware";
import { GetTouch } from "../models/getInTouch";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";
export const getInTouch = TryCatch(async (req, res, next) => {
       
       
        
        const { name, email, phoneNumber } = req.body;
        
        
        if (!name || !email || !phoneNumber ) {
            return next(new ErrorHandler("Please fill all the required fields", 400));
        }
        const message = `The particular Guest wants to send communicate with you \n Name: ${name}\nEmail: ${email} \nPhone: ${phoneNumber}`;
        try {
            await sendEmail({
                email: "alihasan331229@gmail.com",
                subject: `${name} Wants To Communicate`,
                message,
            });
        } catch (error) {
            
            return next(new ErrorHandler("Failed to send email", 500));
        }
       
        const touch = await GetTouch.create({
            name,
            email,
            phoneNumber, 
        });

        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            touch
        });
   
});
