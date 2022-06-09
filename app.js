import "dotenv/config";
import "./database/conexion.js";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Servidor inicializado en http://localhost:${port}`);
});
