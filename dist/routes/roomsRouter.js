"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_controller_1 = require("../controller/rooms.controller");
const multer_1 = require("../middleware/multer");
const roomsRouter = (0, express_1.default)();
roomsRouter.route("/room").post(multer_1.upload, rooms_controller_1.createRoom);
roomsRouter.route("/room/getAll").get(rooms_controller_1.allRooms);
exports.default = roomsRouter;
