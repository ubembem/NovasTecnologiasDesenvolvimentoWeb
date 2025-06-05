import AvaliacaoService from "../services/AvaliacaoService.js";

class AvaliacaoController {
    static async getAllAvaliacoes(req, res) {
        try {
            const avaliacoes = await AvaliacaoService.getAvaliacoes(req.prisma);
            res.json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar avaliações" });
        }
    }

    static async getAvaliacaoById(req, res) {
        try {
            const avaliacao = await AvaliacaoService.getAvaliacaoById(req.prisma, req.params.id);
            if (!avaliacao) {
                return res.status(404).json({ error: "Avaliação não encontrada" });
            }
            res.json(avaliacao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar avaliação" });
        }
    }

    static async createAvaliacao(req, res) {
        try {
            const avaliacao = await AvaliacaoService.createAvaliacao(req.prisma, req.body);
            res.status(201).json(avaliacao);
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar avaliação" });
        }
    }

    static async updateAvaliacao(req, res) {
        try {
            const avaliacao = await AvaliacaoService.updateAvaliacao(req.prisma, req.params.id, req.body);
            res.json(avaliacao);
        } catch (error) {
            res.status(400).json({ error: "Erro ao atualizar avaliação" });
        }
    }

    static async deleteAvaliacao(req, res) {
        try {
            await AvaliacaoService.deleteAvaliacao(req.prisma, req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: "Erro ao excluir avaliação" });
        }
    }
}

export default AvaliacaoController;