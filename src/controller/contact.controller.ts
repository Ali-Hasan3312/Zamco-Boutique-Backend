import { TryCatch } from "../middleware/error.middleware";
import { Contact } from "../models/contact.model";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

export const contactUs = TryCatch(async (req, res, next) => {
    try {
        if (!req.body) {
            return next(new ErrorHandler("Request body is missing", 400));
        }
        
        const { name, email, phoneNumber, userMessage } = req.body;

        if (!name || !email || !phoneNumber || !userMessage) {
            return next(new ErrorHandler("Please fill all the required fields", 400));
        }
        const message = `The particular Guest wants to send communicate with you \n Name: ${name}\nEmail: ${email} \nPhone: ${phoneNumber}\n  ${userMessage}`;

        try {
            await sendEmail({
                email: "alihasan331229@gmail.com",
                subject: `${name} Wants To Communicate`,
                message,
            });
        } catch (error) {
            console.error("Failed to send email:", error);
            return next(new ErrorHandler("Failed to send email", 500));
        }
       
        const contact = await Contact.create({
            name,
            email,
            phoneNumber,
            userMessage,
           
        });

        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            contact
        });
    } catch (error) {
        console.error("Error in roomBooking handler:", error);
        next(new ErrorHandler("Internal Server Error", 500));
    }
});
