import { Router } from "express";
import { crearPost, editarPost, obtenerPosts } from "../controllers/posts.controller.js";
import { validatorPost } from "../middlewares/postsValidatorManager.js";
import { verificarToken } from "../utils/tokenManager.js";

const router = Router();


router.post('/crearPost', validatorPost, verificarToken, crearPost);
router.get('/obtenerPosts', obtenerPosts);
router.put('/actualizarPost/:id', validatorPost ,verificarToken, editarPost);


export default router;