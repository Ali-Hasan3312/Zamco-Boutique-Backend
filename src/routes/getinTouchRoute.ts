import express from "express";
import { getInTouch } from "../controller/getIntouch.controller";

const getInTouchRouter = express();

getInTouchRouter.route("/touch").post(getInTouch)

export default getInTouchRouter;