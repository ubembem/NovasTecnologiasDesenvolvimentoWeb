import AvaliadorService from "../services/AvaliadorService.js";

class AvaliadorController {
    static async getAllAvaliadores(req, res) {
        try {
            const avaliadores = await AvaliadorService.getAvaliadores(req.prisma);
            res.json(avaliadores);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar avaliadores" });
        }
    }

    static async getAvaliadorById(req, res) {
        try {
            const avaliador = await AvaliadorService.getAvaliadorById(req.prisma, req.params.id);
            if (!avaliador) {
                return res.status(404).json({ error: "Avaliador não encontrado" });
            }
            res.json(avaliador);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar avaliador" });
        }
    }

    static async createAvaliador(req, res) {
        try {
            const avaliador = await AvaliadorService.createAvaliador(req.prisma, req.body);
            res.status(201).json(avaliador);
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar avaliador" });
        }
    }

    static async updateAvaliador(req, res) {
        try {
            const avaliador = await AvaliadorService.updateAvaliador(req.prisma, req.params.id, req.body);
            res.json(avaliador);
        } catch (error) {
            res.status(400).json({ error: "Erro ao atualizar avaliador" });
        }
    }

    static async deleteAvaliador(req, res) {
        try {
            await AvaliadorService.deleteAvaliador(req.prisma, req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: "Erro ao excluir avaliador" });
        }
    }
}

export default AvaliadorController;