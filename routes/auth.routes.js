import express from "express";
import { infoUser, login, logout, obtenerUsuarios, refreshToken, register, verificar } from "../controllers/auth.controllers.js";
import { requerirRefreshToken } from "../middlewares/requerirRefreshToken.js";
import { requerirToken } from "../middlewares/requerirToken.js";
import {  bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
import { verificarToken } from "../utils/tokenManager.js";
const router = express.Router();

router.post('/login', bodyLoginValidator, login)
router.post('/register', bodyRegisterValidator, verificarToken ,register)
router.get('/verificar', verificarToken, verificar)
router.get('/obtenerUsuarios', verificarToken, obtenerUsuarios)

router.get('/protected', verificarToken ,infoUser);
router.get('/refresh', requerirRefreshToken, refreshToken);
router.get('/logout', logout)

export default router;