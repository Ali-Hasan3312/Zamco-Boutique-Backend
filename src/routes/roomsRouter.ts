import express from "express";
import { allRooms, createRoom, deleteRoom, getAllRooms } from "../controller/rooms.controller";
import { upload } from "../middleware/multer";

const roomsRouter = express();

roomsRouter.route("/room").post(upload,createRoom);
roomsRouter.route("/room/delete/:id").delete(deleteRoom);
roomsRouter.route("/room/getAll").get(allRooms);
roomsRouter.route("/room/getAllRooms").get(getAllRooms);

export default roomsRouter;