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

  
  export const bodyPlanValidator = [
        body("Planes", "Debe ingresar al menos un plan")
            .isArray()
            .custom((value, { req }) => {
                if (value.length === 0) {
                    throw new Error("Debe ingresar al menos un plan");
                }
                return value;
            }),
            body("tituloPlan", "Debe ingresar un titulo")
            .isString()
            .isLength({ min: 3 })
            .custom((value, { req }) => {
                if (value.length === 0) {
                    throw new Error("Debe ingresar un titulo");
                }
                return value;
            }),
            body("precioPlan", "Debe ingresar un precio")
            .isString()
            .isLength({ min: 3 })
            .custom((value, { req }) => {
                if (value.length === 0) {
                    throw new Error("Debe ingresar un precio");
                }
                return value;
            })
            ,
            validationResultExpress
  ]