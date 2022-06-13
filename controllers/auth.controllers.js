import { response, request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import {
  generarToken,
  gernarTokenRefresh,
  TokenVerificationError,
} from "../utils/tokenManager.js";

export const register = async (req = request, res = response) => {
  const { email, password, username, nombreCompleto, rol } = req.body;

  try {
    const user = new User({ email, password, username, nombreCompleto, rol });
    await user.save();

    return res.json({ok: true, message: 'Usuario creado correctamente'});
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ ok: false, message: "El usuario o email ya existen" }).status(400);
    }

    return res.json({ ok: false, message: "Error en el servidor", mensajePersonalizado: error.message }).status(500);
  }
};
export const login = async (req = request, res = response) => {
  try {

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    console.log(user)
    if (!user)
      return res
        .json({ ok: false, message: "Usuario no encontrado" })
        .status(403);

    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res
        .json({ ok: false, message: "Contraseña incorrecta" })
        .status(403);

    const { token, expiresIn } = generarToken(user.id);
    gernarTokenRefresh(user.id, res);

    return res.json({
      ok: true,
      message: "Login realizado con éxito",
      token,
      email,
      username: user.username,
      nombreCompleto: user.nombreCompleto,
      expiresIn,
    });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, message: "Error en el servidor" }).status(500);
  }
};

export const infoUser = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.uid);

    res.json({
      ok: true,
      email: user.email,
      id: user.id,
    });
  } catch (error) {
    return res.json({ ok: false, message: error.message }).status(500);
  }
};

export const refreshToken = async (req = request, res = response) => {
  try {
    
    const { token, expiresIn } = generarToken(req.uid);

    res.json({ ok: true, token, expiresIn });
  } catch (error) {
    return res.json({ ok: false, message: error.message }).status(500);
  }
};

export const logout = async (req = request, res = response) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true, message: "Logout realizado con éxito" });
};

export const verificar = async (req = request, res = response) => {
    if (req.uid) {
      return res.json({ ok: true, message: "Token válido" });
    } else {
      return res.statusCode(403).json({ ok: false, message: "Token inválido" });
    }
}
