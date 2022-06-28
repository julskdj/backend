import { body } from "express-validator";
import { validationResultExpress } from "./validatorManager.js";

export const bodyMasivoEmailValidator = [
  body("asunto", "El asunto debe tener al menos 6 caracteres")
    .isString()
    .isLength({ min: 6 }),
  body("mensaje", "El mensaje debe tener al menos 10 caracteres")
    .isString()
    .isLength({ min: 10 }),
  validationResultExpress,
];

export const bodyGuardarEmailValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  validationResultExpress,
];

export const bodyConctactenosValidator = [
  body("nombres", "El nombre debe tener al menos 3 caracteres")
    .isString()
    .isLength({ min: 3 }),
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("telefono", "El telefono debe tener al menos 6 caracteres")
    .isString()
    .isLength({ min: 6 }),
  body("asunto", "El asunto debe tener al menos 6 caracteres")
    .isString()
    .isLength({ min: 6 }),
  body("mensaje", "El mensaje debe tener al menos 10 caracteres")
    .isString()
    .isLength({ min: 10 }),
  validationResultExpress,
];
