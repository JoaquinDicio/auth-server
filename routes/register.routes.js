import { Router } from "express";
import { registerNewUser } from "../controllers/newUSer.controller.js";
const registerRouter = Router();

registerRouter.post("/", registerNewUser);

export default registerRouter;
