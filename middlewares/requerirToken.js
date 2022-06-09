import { response, request } from "express";
import jwt from "jsonwebtoken";
import { TokenVerificationError } from "../utils/tokenManager.js";


export const requerirToken = (req = request, res = response, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error('No Bearer token'); 
        console.log(token);

        token = token.split(' ')[1];
        const {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message)

        return res.status(401).json({
            ok: false,
            message: TokenVerificationError[error.message]
        });
    }
}

// export const requerirToken = (req = request, res = response, next) => {
//     try {
//         let token = req.headers?.authorization;
//         if (!token) throw new Error('No Bearer token'); 
//         console.log(token);

//         token = token.split(' ')[1];
//         const {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.uid = uid;

//         next();
//     } catch (error) {

//         console.log(error.message)

//         const TokenVerificationError = {
//             ["invalid signature"]: 'La firma del token es inválida',
//             ["jwt expired"]: 'El token ha expirado',
//             ["invalid token"]: 'El token es inválido',
//             ["invalid token signature"]: 'La firma del token es inválida',
//             ["jwt malformed"]: 'El token está mal formado',
//             ["No Bearer token"]: 'Utiliza el formato Bearer token',
//         }

//         return res.status(401).json({
//             ok: false,
//             message: TokenVerificationError[error.message]
//         });
        
//     }
// }