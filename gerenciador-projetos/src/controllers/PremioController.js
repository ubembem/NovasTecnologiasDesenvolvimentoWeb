import PremioService from "../services/PremioService.js";

class PremioController {
    static async getAllPremios(req, res) {
        try {
            const premios = await PremioService.getPremios(req.prisma);
            res.json(premios);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar prêmios" });
        }
    }

    static async getPremioById(req, res) {
        try {
            const premio = await PremioService.getPremioById(req.prisma, req.params.id);
            if (!premio) {
                return res.status(404).json({ error: "Prêmio não encontrado" });
            }
            res.json(premio);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar prêmio" });
        }
    }

    static async createPremio(req, res) {
        try {
            const premio = await PremioService.createPremio(req.prisma, req.body);
            res.status(201).json(premio);
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar prêmio" });
        }
    }

    static async updatePremio(req, res) {
        try {
            const premio = await PremioService.updatePremio(req.prisma, req.params.id, req.body);
            res.json(premio);
        } catch (error) {
            res.status(400).json({ error: "Erro ao atualizar prêmio" });
        }
    }

    static async deletePremio(req, res) {
        try {
            await PremioService.deletePremio(req.prisma, req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: "Erro ao excluir prêmio" });
        }
    }
}

export default PremioController;