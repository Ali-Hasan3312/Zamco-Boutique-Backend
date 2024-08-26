import express from "express";
import { allRooms, createRoom } from "../controller/rooms.controller";
import { upload } from "../middleware/multer";

const roomsRouter = express();

roomsRouter.route("/room").post(upload,createRoom);
roomsRouter.route("/room/getAll").get(allRooms);

export default roomsRouter;