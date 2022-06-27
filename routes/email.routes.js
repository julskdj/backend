import { Router } from "express";
import { enviarMailMasivo } from "../controllers/mailMasivo.controllers.js";
import { bodyMasivoEmailValidator } from "../middlewares/validatorMasivoMail.js";

const router = Router();

router.post("/enviarMasivo", bodyMasivoEmailValidator ,enviarMailMasivo);

export default router;
