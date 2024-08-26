"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getIntouch_controller_1 = require("../controller/getIntouch.controller");
const getInTouchRouter = (0, express_1.default)();
getInTouchRouter.route("/touch").post(getIntouch_controller_1.getInTouch);
exports.default = getInTouchRouter;
