import express from "express";
import { allMails, contactUs } from "../controller/contact.controller";

const contactRouter = express();

contactRouter.route("/contact").post(contactUs)
contactRouter.route("/contact/getAll").get(allMails)

export default contactRouter;