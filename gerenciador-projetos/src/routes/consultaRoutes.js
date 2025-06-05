import express from 'express';
import { ConsultaController } from '../controllers/ConsultaController.js';

const router = express.Router();

router.get('/projetos-com-autores', ConsultaController.listarProjetosComAutores);
router.get('/autores-com-projetos', ConsultaController.listarAutoresComProjetos);
router.get('/projetos-nao-avaliados', ConsultaController.listarProjetosNaoAvaliados);
router.get('/projetos-avaliados', ConsultaController.listarProjetosAvaliados);
router.get('/projetos-vencedores', ConsultaController.listarProjetosVencedores);

export default router;