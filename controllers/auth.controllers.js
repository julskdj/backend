import { response, request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generarToken, gernarTokenRefresh } from "../utils/tokenManager.js";

export const register = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    return res.json({
      ok: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .json({
          ok: false,
          message: "El email ya existe",
        })
        .status(400);
    }

    return res
      .json({
        ok: false,
        message: "Error en el servidor",
      })
      .status(500);
  }
};
export const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res
        .json({
          ok: false,
          message: "Usuario no encontrado",
        })
        .status(403);

    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res
        .json({
          ok: false,
          message: "Contraseña incorrecta",
        })
        .status(403);

    const { token, expiresIn } = generarToken(user.id);
    gernarTokenRefresh(user.id, res);

    return res.json({
      ok: true,
      message: "Login realizado con éxito",
      token,
      expiresIn,
    });
  } catch (error) {
    console.log(error);
    return res
      .json({
        ok: false,
        message: "Error en el servidor",
      })
      .status(500);
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
    return res
      .json({
        ok: false,
        message: error.message,
      })
      .status(500);
  }
};

export const refreshToken = async (req = request, res = response) => {
    
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error('No JWT token');

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        const {token, expiresIn} = generarToken(uid)

        res.json({
            ok: true,
            token,
            expiresIn
        })

    } catch (error) {

        console.log(error.message)

        const TokenVerificationError = {
            ["invalid signature"]: 'La firma del token es inválida',
            ["jwt expired"]: 'El token ha expirado',
            ["invalid token"]: 'El token es inválido',
            ["invalid token signature"]: 'La firma del token es inválida',
            ["jwt malformed"]: 'El token está mal formado',
            ["No Bearer token"]: 'Utiliza el formato Bearer token',
            ["No JWT token"]: 'No se encontró el token JWT',
        }

        return res.status(401).json({
            ok: false,
            message: TokenVerificationError[error.message]
        });
        
    }
}


export const logout = async (req = request, res = response) => {
    res.clearCookie('refreshToken');
    res.json({
        ok: true,
        message: 'Logout realizado con éxito'
    })
}
