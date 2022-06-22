import { request, response, Router } from "express";
import { guardarPlan, obtenerPlans } from "../controllers/plan.controllers.js";
import { bodyPlanValidator } from "../middlewares/validatorPlan.js";
import { verificarToken } from "../utils/tokenManager.js";
const router = Router();


router.post("/nuevoPlan", bodyPlanValidator , verificarToken ,guardarPlan)
router.get("/obtenerPlanes",obtenerPlans)

export default router;