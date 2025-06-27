// src/controllers/PremioController.js
import prisma from '../lib/prismaClient.js';
import { z } from 'zod';

// Validação dos dados com Zod
const premioSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    descricao: z.string(),
    ano: z.number().int(),
    dataInicial: z.coerce.date(),
    dataFinal: z.coerce.date(),
});

const PremioController = {
    async getAllPremios(req, res) {
        try {
            const premios = await prisma.premio.findMany();
            res.json(premios);
        } catch (err) {
            res.status(500).json({ erro: "Erro ao buscar prêmios" });
        }
    },

    async getPremioById(req, res) {
        const { id } = req.params;
        try {
            const premio = await prisma.premio.findUnique({
                where: { id: Number(id) }
            });
            if (!premio) {
                return res.status(404).json({ erro: "Prêmio não encontrado" });
            }
            res.json(premio);
        } catch (err) {
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    async createPremio(req, res) {
        try {
            const dados = premioSchema.parse(req.body);
            const novoPremio = await prisma.premio.create({
                data: dados
            });
            res.status(201).json(novoPremio);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async updatePremio(req, res) {
        const { id } = req.params;
        try {
            const dados = premioSchema.parse(req.body);
            const premioAtualizado = await prisma.premio.update({
                where: { id: Number(id) },
                data: dados
            });
            res.json(premioAtualizado);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async deletePremio(req, res) {
        const { id } = req.params;
        try {
            await prisma.premio.delete({
                where: { id: Number(id) }
            });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ erro: "Erro ao deletar prêmio" });
        }
    }
};

export default PremioController;
