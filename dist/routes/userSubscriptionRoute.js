"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSubscription_controller_1 = require("../controller/userSubscription.controller");
const userSubscriptionRouter = (0, express_1.default)();
userSubscriptionRouter.route("/subscribe").post(userSubscription_controller_1.userSubscription);
exports.default = userSubscriptionRouter;
