import jwt from "jsonwebtoken"

export const generarToken = (uid) => {
    try {

        const expiresIn = 60 * 60 * 1; // 1 horas 

        const token = jwt.sign({ uid }, process.env.JWT_SECRET_KEY, { expiresIn });
        return {token, expiresIn};
    } catch (error) {
        console.log(error)
    }
}

export const gernarTokenRefresh = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30; // 1 mes

    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
        
        return refreshToken

        
    } catch (error) {
        
    }

}

export const verificarToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.json({ ok: false, message: "No se ha enviado el token" }).status(403);
    }
    console.log(token)
    token = token.split(" ")[1];
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.json({ ok: false, message: TokenVerificationError[error.message] }).status(403);
    }
}

export const TokenVerificationError = {
    ["invalid signature"]: 'La firma del token es inválida',
    ["jwt expired"]: 'El token ha expirado',
    ["invalid token"]: 'El token es inválido',
    ["invalid token signature"]: 'La firma del token es inválida',
    ["jwt malformed"]: 'El token está mal formado',
    ["No Bearer token"]: 'Utiliza el formato Bearer token',
    ["No JWT token"]: 'No se encontró el token JWT',
}