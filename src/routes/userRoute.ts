import express from "express";
import { deleteStaff, getAllStaff, newStaff, updateStaff } from "../controller/user.controller";
import { upload } from "../middleware/multer";

const userRouter = express();
userRouter.route("/staff/new").post(upload,newStaff);
userRouter.route("/staff/update:id").put(updateStaff);
userRouter.route("/staff/delete:id").delete(deleteStaff);
userRouter.route("/staff/getAll").get(getAllStaff);

export default userRouter;