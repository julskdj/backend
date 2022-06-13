import { body, param } from "express-validator";

export const validatorPost = [
    body("title", "El titulo debe tener al menos 6 caracteres")
        .isLength({ min: 6 }),
    body("content", "El contenido debe tener al menos 8 caracteres")
        .isLength({ min: 8 }),
]

