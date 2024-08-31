import express from "express";
import { allRooms, createRoom, deleteRoom, getAllRooms, updatRoom } from "../controller/rooms.controller";
import { upload } from "../middleware/multer";

const roomsRouter = express();

roomsRouter.route("/room").post(upload,createRoom);
roomsRouter.route("/room/delete/:id").delete(deleteRoom);
roomsRouter.route("/room/getAll").get(allRooms);
roomsRouter.route("/room/getAllRooms").get(getAllRooms);
roomsRouter.route("/room/update/:id").put(upload,updatRoom);

export default roomsRouter;