import express from "express";
import { infoUser, login, logout, refreshToken, register, verificar } from "../controllers/auth.controllers.js";
import { requerirRefreshToken } from "../middlewares/requerirRefreshToken.js";
import { requerirToken } from "../middlewares/requerirToken.js";
import {  bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
import { verificarToken } from "../utils/tokenManager.js";
const router = express.Router();

router.post('/login', bodyLoginValidator, login)
router.post('/register', bodyRegisterValidator, verificarToken ,register)
router.get('/verificar', verificarToken, verificar)

router.get('/protected', verificarToken ,infoUser);
router.get('/refresh', requerirRefreshToken, refreshToken);
router.get('/logout', logout)

export default router;