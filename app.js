import "dotenv/config";
import "./database/conexion.js";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import archivosRouter from "./routes/archivos.routes.js";
import planesRouter from "./routes/planes.routes.js";
import cookieParser from "cookie-parser";
import EmailRouter from "./routes/email.routes.js";
import cors from "cors";
const app = express();

const port = process.env.PORT || 5000;

//access control allow origin

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/files", archivosRouter);
app.use("/api/v1/planes", planesRouter);
app.use("/api/v1/email", EmailRouter)
app.use(express.static( "public"));

app.listen(port, () => {
  console.log(`Servidor inicializado en http://localhost:${port}`);
});
