import { response, request } from "express";

export const register = async (req = request, res = response) => {

    console.log(req.body);

    res.json({
        ok: true,
        message: 'Registro realizado con éxito'
    });
}
export const login = async (req = request, res = response) => {
    res.json({
        ok: true,
        message: 'Login realizado con éxito'
    });
}

