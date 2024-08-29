import express from "express";
import { getDashboardStats } from "../controller/stats.controller";

const statsRouter = express();

statsRouter.route("/stats").get(getDashboardStats)

export default statsRouter;