import { request, response } from "express";

export const subirVideo = (req = request, res = response) => {
    try {
        res.json({
            ok: true,
            message: "Video subido correctamente",
            data: req.file
        })
    } catch (error) {
        res.json({
            ok: false,
            message: error
        })
    }

}