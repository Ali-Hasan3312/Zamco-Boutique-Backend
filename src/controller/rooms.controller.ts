import { TryCatch } from "../middleware/error.middleware";
import { Room } from "../models/room.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";

export const createRoom = TryCatch(async(req, res, next)=>{
   const {roomReviews,roomType, roomPrice, roomStatus, roomDescription} = req.body; 
   if(!roomType || !roomPrice || !roomStatus || !roomDescription){
    return next(new ErrorHandler("Please fill all the fields", 400));
   }
   const photo = req.file?.path;
   if(!photo){
    return next(new ErrorHandler("Please upload a photo", 400));
   }
   const cloudPhoto = await uploadOnCloudinary(photo)
   const room = await Room.create({
    roomReviews,
    roomType,
    roomPrice,
    roomStatus,
    roomDescription,
    photo: cloudPhoto?.url
   });
   res.status(201).json({
    success: true,
    message: "Room created successfully",
    room
   });
}); 

export const allRooms = TryCatch(async(req,res,next)=>{
    const rooms = await Room.find({roomStatus:true});
    res.status(200).json({
        success: true,
        rooms
    })
})

