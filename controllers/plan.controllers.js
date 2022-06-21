import { request, response } from "express";
import { Plan } from "../models/Plan.js";

export const guardarPlan = async (req = request, res = response) => {

    console.log(req.body);

    let { Planes } = req.body;

    let PlanesGuardados = {};

    for (let i = 0; i < Planes.length; i++) {
        
        PlanesGuardados[`item${i+1}`] = Planes[i];

    }

    console.log(PlanesGuardados);
    // let plan = await new Plan()

    res.json({
        ok: true,
        message: "Plan creado correctamente",
        data: req.body,
        PlanesGuardados
    });


}