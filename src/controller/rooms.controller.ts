import { TryCatch } from "../middleware/error.middleware";
import { Room } from "../models/room.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";

export const createRoom = TryCatch(async(req, res, next)=>{
   const {roomType, roomPrice, roomStatus, roomDescription} = req.body; 
   if(!roomType || !roomPrice || !roomStatus || !roomDescription){
    return next(new ErrorHandler("Please fill all the fields", 400));
   }
   const photo = req.file?.path;
   if(!photo){
    return next(new ErrorHandler("Please upload a photo", 400));
   }
   const cloudPhoto = await uploadOnCloudinary(photo)
   const room = await Room.create({
    
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
export const getAllRooms = TryCatch(async(req,res,next)=>{
    const rooms = await Room.find();
    res.status(200).json({
        success: true,
        rooms
    })
})
export const deleteRoom = TryCatch(async(req, res, next)=>{
    const {id} = req.params;
    const room = await Room.findById(id);
    if(!room){
        return next(new ErrorHandler("Room not found", 404));
    }
    await room.deleteOne();
    res.status(200).json({
        success: true,
        message: "Room deleted successfully"
    })
}) ;
export const updatRoom = TryCatch(async(req, res, next)=>{
    const {id} = req.params;
    const room = await Room.findById(id);
    
    
    if(!room){
        return next(new ErrorHandler("Room not found", 404));
    }
    const {roomType, roomPrice, roomStatus, roomDescription} = req.body;
    
    if(!roomType && !roomPrice && !roomStatus && !roomDescription){
        return next(new ErrorHandler("Please fill atleast one field", 400));
       }
    const photo = req.file?.path;
    
    if (photo) {
        const cloudPhoto = await uploadOnCloudinary(photo);
        
        if (!cloudPhoto?.url) {
            throw new Error("Failed to upload photo to Cloudinary");
        }
        
        room.photo = cloudPhoto.url;
    }
    if(roomType){
        room.roomType = roomType;
    }
    if(roomPrice){
        room.roomPrice = roomPrice;
    }
    if(roomStatus){
        room.roomStatus = roomStatus;
    }
    if(roomDescription){
        room.roomDescription = roomDescription;
    }
    await room.save();
    res.status(200).json({
        success: true,
        message: "Room updated successfully",
        room
    })
});
