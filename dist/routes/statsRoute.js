"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stats_controller_1 = require("../controller/stats.controller");
const statsRouter = (0, express_1.default)();
statsRouter.route("/stats").get(stats_controller_1.getDashboardStats);
exports.default = statsRouter;
