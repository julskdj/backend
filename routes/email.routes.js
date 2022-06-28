import { Router } from "express";
import { contactenosMail, enviarMailMasivo, guardarEmail } from "../controllers/mailMasivo.controllers.js";
import { requerirToken } from "../middlewares/requerirToken.js";
import { bodyConctactenosValidator, bodyGuardarEmailValidator, bodyMasivoEmailValidator } from "../middlewares/validatorMasivoMail.js";

const router = Router();

router.post("/enviarMasivo", requerirToken ,bodyMasivoEmailValidator ,enviarMailMasivo);
router.post("/guardarEmail" ,bodyGuardarEmailValidator ,guardarEmail);
router.post("/contacto" ,bodyConctactenosValidator, contactenosMail);

export default router;
