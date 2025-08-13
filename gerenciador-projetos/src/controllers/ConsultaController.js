import { ConsultaService } from '../services/ConsultaService.js';

export class ConsultaController {
    static async listarProjetosComAutores(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosComAutores({
                orderBy: { id: 'asc' }
            });
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarAutoresComProjetos(req, res) {
        try {
            const autores = await ConsultaService.listarAutoresComProjetos({
                orderBy: { id: 'asc' }
            });
            res.json(autores);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarProjetosNaoAvaliados(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosNaoAvaliados({
                orderBy: { id: 'asc' }
            });
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarProjetosAvaliados(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosAvaliados({
                orderBy: { id: 'asc' }
            });
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarProjetosVencedores(req, res) {
        try {
            const vencedores = await ConsultaService.listarProjetosVencedores();
            res.json(vencedores);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}
