import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controllers.js";
import { validationResultExpress } from "../middlewares/validatorResultExpress.js";
const router = express.Router();

router.post('/login', [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
], validationResultExpress, login)

router.post('/register', [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', 'La contraseña debe tener al menos 6 caracteres').trim().isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            return value;
        })
],
    validationResultExpress,
    register)

export default router;