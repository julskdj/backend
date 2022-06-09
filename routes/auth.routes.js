import express from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controllers.js";
import { requerirRefreshToken } from "../middlewares/requerirRefreshToken.js";
import { requerirToken } from "../middlewares/requerirToken.js";
import {  bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const router = express.Router();

router.post('/login', bodyLoginValidator, login)
router.post('/register', bodyRegisterValidator, register)

router.get('/protected', requerirToken ,infoUser);
router.get('/refresh', requerirRefreshToken, refreshToken);
router.get('/logout', logout)

export default router;