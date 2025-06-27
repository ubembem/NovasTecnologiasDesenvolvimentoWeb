import express from "express";
import AutorController from "../controllers/AutorController.js";

const router = express.Router();

router.get("/", AutorController.getAllAutores);
router.get("/:id", AutorController.getAutorById);
router.post("/", AutorController.createAutor);
router.put("/:id", AutorController.updateAutor);
router.delete("/:id", AutorController.deleteAutor);

export default router;
