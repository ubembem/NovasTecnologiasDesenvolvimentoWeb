import { ConsultaService } from '../services/ConsultaService.js';

export class ConsultaController {
    static async listarProjetosComAutores(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosComAutores();
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarAutoresComProjetos(req, res) {
        try {
            const autores = await ConsultaService.listarAutoresComProjetos();
            res.json(autores);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarProjetosNaoAvaliados(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosNaoAvaliados();
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarProjetosAvaliados(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosAvaliados();
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
