import { TryCatch } from "../middleware/error.middleware";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

export const contactUs = TryCatch(async (req, res, next) => {
   
        
        const { name, email, userId } = req.body;
        const photo = req.file?.path;
        if (!name || !email || !userId || !photo) {
            return next(new ErrorHandler("Please fill all the required fields", 400));
        }

        const cloudPhoto = await uploadOnCloudinary(photo)

        const user = await User.create({
            userId,
            name,
            email,
            photo: cloudPhoto,
        });

       
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user
        });
   
});

