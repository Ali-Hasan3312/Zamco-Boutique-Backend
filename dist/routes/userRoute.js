"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const multer_1 = require("../middleware/multer");
const userRouter = (0, express_1.default)();
userRouter.route("/staff/new").post(multer_1.upload, user_controller_1.newStaff);
userRouter.route("/staff/update:id").put(user_controller_1.updateStaff);
userRouter.route("/staff/delete:id").delete(user_controller_1.deleteStaff);
userRouter.route("/staff/getAll").get(user_controller_1.getAllStaff);
exports.default = userRouter;
