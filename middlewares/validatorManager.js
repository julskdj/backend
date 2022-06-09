import { response, request } from "express";
import { validationResult, body} from "express-validator";

export const validationResultExpress = (req = request, res = response, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
}

export const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    validationResultExpress
]

export const bodyRegisterValidator =  [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'La contraseña debe tener al menos 6 caracteres')
    .trim()
    .isLength({ min: 6 })
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            return value;
        }),
        validationResultExpress
]