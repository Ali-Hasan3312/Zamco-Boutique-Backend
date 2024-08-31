import { TryCatch } from "../middleware/error.middleware";
import { Contact } from "../models/contact.model";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

export const contactUs = TryCatch(async (req, res, next) => {
   
        
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
   
});
export const allMails = TryCatch(async (req, res, next) => {
    const mails = await Contact.find().sort({ createdAt: -1 })
        // Update the roomStatus to false
        res.status(201).json({
            success: true,
            mails
        });
   
});
export const deleteMail = TryCatch(async (req, res, next) => {
    const mail =  await Contact.findById(req.params.id)
       if(!mail) return next(new ErrorHandler("Mail not found", 404))
        await mail.deleteOne()
        res.status(201).json({
            success: true,
            message: "Mail Deleted Successfully"
        });
   
});
