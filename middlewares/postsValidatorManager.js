import { body, param } from "express-validator";
import { validationResultExpress } from "./validatorManager.js";

export const validatorPost = [
    body("title", "El titulo debe tener al menos 6 caracteres")
        .isLength({ min: 6 }),
    body("content", "El contenido debe tener al menos 8 caracteres")
        .isLength({ min: 8 }),
        validationResultExpress
]

