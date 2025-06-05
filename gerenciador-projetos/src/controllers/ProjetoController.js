import ProjetoService from "../services/ProjetoService.js";

class ProjetoController {
    static async getAllProjetos(req, res) {
        try {
            const projetos = await ProjetoService.getProjetos(req.prisma);
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar projetos" });
        }
    }

    static async getProjetoById(req, res) {
        try {
            const projeto = await ProjetoService.getProjetoById(req.prisma, req.params.id);
            if (!projeto) {
                return res.status(404).json({ error: "Projeto não encontrado" });
            }
            res.json(projeto);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar projeto" });
        }
    }

    static async createProjeto(req, res) {
        try {
            const projeto = await ProjetoService.createProjeto(req.prisma, req.body);
            res.status(201).json(projeto);
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar projeto" });
        }
    }

    static async updateProjeto(req, res) {
        try {
            const projeto = await ProjetoService.updateProjeto(req.prisma, req.params.id, req.body);
            res.json(projeto);
        } catch (error) {
            res.status(400).json({ error: "Erro ao atualizar projeto" });
        }
    }

    static async deleteProjeto(req, res) {
        try {
            await ProjetoService.deleteProjeto(req.prisma, req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: "Erro ao excluir projeto" });
        }
    }
}

export default ProjetoController;