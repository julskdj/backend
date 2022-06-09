import jwt from "jsonwebtoken"

export const generarToken = (uid) => {
    try {

        const expiresIn = 60 * 15; // 15 minutos

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
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === 'developers'),
            expires: new Date(Date.now() + expiresIn * 1000),
        });
    } catch (error) {
        
    }

}

export const erroresToken = (error) => {
    switch (error) {
        case "invalid signature":
            return "La firma del token es inválida";
        case "jwt expired":
            return "El token ha expirado";
        case "invalid token":
            return "El token es inválido";
        
        default:
            return "Error en el servidor";
    }
}