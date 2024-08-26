import express from "express";
import { userSubscription } from "../controller/userSubscription.controller";

const userSubscriptionRouter = express();

userSubscriptionRouter.route("/subscribe").post(userSubscription)

export default userSubscriptionRouter;