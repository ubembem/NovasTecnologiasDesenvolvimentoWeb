import { Router } from 'express';
import { ConsultaController } from '../controllers/ConsultaController.js';

const router = Router();

router.get('/listarAutoresComProjetos', ConsultaController.listarAutoresComProjetos);
router.get('/listarProjetosAvaliados', ConsultaController.listarProjetosAvaliados);
router.get('/listarProjetosNaoAvaliados', ConsultaController.listarProjetosNaoAvaliados);
router.get('/listarProjetosComAutores', ConsultaController.listarProjetosComAutores);
router.get('/listarProjetosVencedores', ConsultaController.listarProjetosVencedores);

export default router;
