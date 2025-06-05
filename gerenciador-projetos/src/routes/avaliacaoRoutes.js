import express from "express";
import AvaliacaoController from "../controllers/AvaliacaoController.js";

const router = express.Router();

router.get("/", AvaliacaoController.getAllAvaliacoes);
router.get("/:id", AvaliacaoController.getAvaliacaoById);
router.post("/", AvaliacaoController.createAvaliacao);
router.put("/:id", AvaliacaoController.updateAvaliacao);
router.delete("/:id", AvaliacaoController.deleteAvaliacao);

export default router;