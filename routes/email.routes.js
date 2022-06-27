import { Router } from "express";
import { enviarMailMasivo, guardarEmail } from "../controllers/mailMasivo.controllers.js";
import { requerirToken } from "../middlewares/requerirToken.js";
import { bodyGuardarEmailValidator, bodyMasivoEmailValidator } from "../middlewares/validatorMasivoMail.js";

const router = Router();

router.post("/enviarMasivo", requerirToken ,bodyMasivoEmailValidator ,enviarMailMasivo);
router.post("/guardarEmail" ,bodyGuardarEmailValidator ,guardarEmail);

export default router;
