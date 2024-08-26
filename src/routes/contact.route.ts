import express from "express";
import { contactUs } from "../controller/contact.controller";

const contactRouter = express();

contactRouter.route("/contact").post(contactUs)

export default contactRouter;