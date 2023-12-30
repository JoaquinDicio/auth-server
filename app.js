import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import registerRouter from "./routes/register.routes.js";
import verifyToken from "./middlewares/verifyToken.js";
import dotenv from "dotenv";
//loading environment variables
dotenv.config();

const app = express();
//middlewares
app.use(express.json());
app.use(cors());
//routers
app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.get("/", verifyToken, (req, res) => {
  res.status(200).send("Access garanted");
});
//port
app.listen(8080, () => console.log("Server at", process.env._PORT));
