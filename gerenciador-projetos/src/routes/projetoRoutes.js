import express from "express";
import ProjetoController from "../controllers/ProjetoController.js";

const router = express.Router();

router.get("/", ProjetoController.getAllProjetos);
router.get("/:id", ProjetoController.getProjetoById);
router.post("/", ProjetoController.createProjeto);
router.put("/:id", ProjetoController.updateProjeto);
router.delete("/:id", ProjetoController.deleteProjeto);

export default router;