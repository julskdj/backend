import { request, response } from "express";
import jwt from "jsonwebtoken";
import { TokenVerificationError } from "../utils/tokenManager.js";

export const requerirRefreshToken = async (req = request, res = response, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No JWT token");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error.message);

    return res
      .status(401)
      .json({ ok: false, message: TokenVerificationError[error.message] });
    }
}