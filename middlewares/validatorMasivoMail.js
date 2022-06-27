import { response, request } from "express";
import { validationResult, body } from "express-validator";
import { validationResultExpress } from "./validatorManager.js";

export const bodyMasivoEmailValidator = [
    body("asunto", "El asunto debe tener al menos 6 caracteres")
        .isString()
        .isLength({ min: 6 }),
    body("mensaje", "El mensaje debe tener al menos 10 caracteres")
        .isString()
        .isLength({ min: 10 }),
    validationResultExpress
]