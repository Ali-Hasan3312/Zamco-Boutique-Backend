import { TryCatch } from "../middleware/error.middleware";
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";

export const newStaff = TryCatch(async (req, res, next) => {
        const { name, email,address, mobile, dateOfBirth } = req.body;
        const photo = req.file?.path;
        if (!name || !email  || !photo || !address || !mobile || !dateOfBirth ) {
            return next(new ErrorHandler("Please fill all the required fields", 400));
        }
        const cloudPhoto = await uploadOnCloudinary(photo)
        const user = await User.create({
            name,
            email,
            address,
            mobile,
            dateOfBirth,
            photo: cloudPhoto?.url,
        });
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user
        });
   
});
export const updateStaff = TryCatch(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    res.status(200).json(user);
   
});
export const deleteStaff = TryCatch(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    res.status(200).json({ message: "User deleted successfully" });
   
});
export const getAllStaff = TryCatch(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
        res.status(201).json({
            success: true,
            users
        });
   
});

