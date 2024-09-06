import { TryCatch } from "../middleware/error.middleware";
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";
import admin from "../firebaseAdmin/admin";
export const newStaff = TryCatch(async (req, res, next) => {
        const {_id, name, email,address, mobile, dateOfBirth } = req.body;
        const photo = req.file?.path;
        if (!_id || !name || !email  || !photo || !address || !mobile || !dateOfBirth ) {
            return next(new ErrorHandler("Please fill all the required fields", 400));
        }
        const cloudPhoto = await uploadOnCloudinary(photo)
        const user = await User.create({
            _id,
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
    const { name, email,address, mobile, dateOfBirth } = req.body;
    const user = await User.findById(req.params.id);
    const photo = req.file?.path;
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    if(photo){
        const cloudPhoto = await uploadOnCloudinary(photo)
        if (cloudPhoto?.url) {
            user.photo = cloudPhoto.url;
        }
    }
    if(name){
        user.name = name;
    }
    if(email){
        user.email = email;
    }
    if(address){
        user.address = address;
    }
    if(mobile){
        user.mobile = mobile;
    }
    if(dateOfBirth){
        user.dateOfBirth = dateOfBirth;
    }
    await user.save();
    res.status(200).json(user);
   
});
export const deleteStaff = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    await user.deleteOne();
    await admin.auth().deleteUser(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
   
});
export const getSingleStaff = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    
    res.status(201).json({
        success: true,
        user
    });
   
});
export const getAllStaff = TryCatch(async (req, res, next) => {
    const users = await User.find();
        res.status(201).json({
            success: true,
            users
        });
   
});

