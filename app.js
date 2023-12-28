import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import registerRouter from "./routes/register.routes.js";
import verifyToken from "./middlewares/verifyToken.js";
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
//routers
app.use("/auth", authRouter);
app.use("/login", registerRouter);
app.get("/", verifyToken, (req, res) => {
  res.status(200).send("Access garanted");
});
//port
app.listen(8080, () => console.log("Server at 8080"));
