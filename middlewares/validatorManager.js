import { response, request } from "express";
import { validationResult, body } from "express-validator";

export const validationResultExpress = (
  req = request,
  res = response,
  next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 6 caracteres")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      return value;
    }),
  body("username", "El nombre de usuario debe tener al menos 3 caracteres")
    .trim()
    .isLength({ min: 3 }),
  body(
    "nombreCompleto",
    "El nombre completo debe tener al menos 6 caracteres"
  ).isLength({ min: 6 }),
  body(
    "rol",
    "El rol debe ser uno de los siguientes: admin, doctor, asesor"
  ).isIn(["admin", "doctor", "asesor"]),

  validationResultExpress,
];

export const bodyEditarUsuarioValidator = [
  body("password", "La contraseña debe tener al menos 6 caracteres")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      return value;
    }),
  body("_id", "El id del usuario es requerido").isMongoId(),

  validationResultExpress,
];

export const bodyEliminarUsuarioValidator = [
  body("_id", "El id del usuario es requerido").isMongoId(),
  validationResultExpress,
]
