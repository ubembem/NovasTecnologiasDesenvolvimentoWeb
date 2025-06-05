import express from "express";
import AvaliadorController from "../controllers/AvaliadorController.js";

const router = express.Router();

router.get("/", AvaliadorController.getAllAvaliadores);
router.get("/:id", AvaliadorController.getAvaliadorById);
router.post("/", AvaliadorController.createAvaliador);
router.put("/:id", AvaliadorController.updateAvaliador);
router.delete("/:id", AvaliadorController.deleteAvaliador);

export default router;