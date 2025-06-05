import express from "express";
import PremioController from "../controllers/PremioController.js";

const router = express.Router();

router.get("/", PremioController.getAllPremios);
router.get("/:id", PremioController.getPremioById);
router.post("/", PremioController.createPremio);
router.put("/:id", PremioController.updatePremio);
router.delete("/:id", PremioController.deletePremio);

export default router;