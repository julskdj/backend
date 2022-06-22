import { request, response } from "express";
import { Plan } from "../models/Plan.js";

export const guardarPlan = async (req = request, res = response) => {
  try {

    let { Planes, id, tituloPlan, precioPlan } = req.body;
    let PlanesGuardados = {};

    for (let i = 0; i < 5; i++) {
        if (Planes[i] === undefined || Planes[i] === null) {
            
            PlanesGuardados[`item${i + 1}`] = ""
        } else {
            PlanesGuardados[`item${i + 1}`] = Planes[i];
        }
    }

    PlanesGuardados.tituloPlan = tituloPlan
    PlanesGuardados.precioPlan = precioPlan
    const resp = await Plan.findByIdAndUpdate({_id: id}, PlanesGuardados) 

    console.log(PlanesGuardados);
    // let plan = await new Plan()

    res.json({
      ok: true,
      message: "Plan creado correctamente",
      data: req.body,

      PlanesGuardados,
      resp
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error,
    });
  }
};

export const obtenerPlans = async (req = request, res = response) => {
  try {
    let plan = await Plan.find();
    res.json({
      ok: true,
      message: "Plan obtenido correctamente",
      data: plan,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error,
    });
  }
};
