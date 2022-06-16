import { Router } from "express";
const router = Router();
import { subirVideo } from "../controllers/archivos.controllers.js";
import { video } from "../middlewares/videoMiddleware.js";





router.post("/video", video, subirVideo )


export default router;
