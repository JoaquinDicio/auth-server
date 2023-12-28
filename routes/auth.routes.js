import { Router } from "express";
import { authUser } from "../controllers/authUser.controller.js";
const authRouter = Router();

authRouter.post("/login", authUser);

export default authRouter;
