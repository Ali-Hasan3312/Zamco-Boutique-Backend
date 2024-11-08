"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("../controller/contact.controller");
const contactRouter = (0, express_1.default)();
contactRouter.route("/contact").post(contact_controller_1.contactUs);
contactRouter.route("/contact/getAll").get(contact_controller_1.allMails);
contactRouter.route("/contact/delete/:id").delete(contact_controller_1.deleteMail);
exports.default = contactRouter;
