import express from "express";
import { allMails, contactUs, deleteMail } from "../controller/contact.controller";

const contactRouter = express();

contactRouter.route("/contact").post(contactUs)
contactRouter.route("/contact/getAll").get(allMails)
contactRouter.route("/contact/delete/:id").delete(deleteMail)

export default contactRouter;