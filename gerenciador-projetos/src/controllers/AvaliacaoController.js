// src/controllers/AvaliacaoController.js
import prisma from '../lib/prismaClient.js';
import { z } from 'zod';

const avaliacaoSchema = z.object({
    nota: z.number().min(0).max(10),
    comentario: z.string().optional(),
    avaliadorId: z.number().int(),
    projetoId: z.number().int()
});

const AvaliacaoController = {
    async getAllAvaliacoes(req, res) {
        try {
            const avaliacoes = await prisma.avaliacao.findMany({
                include: { projeto: true, avaliador: true }
            });
            res.json(avaliacoes);
        } catch (err) {
            res.status(500).json({ erro: "Erro ao buscar avaliações" });
        }
    },

    async getAvaliacaoById(req, res) {
        const { id } = req.params;
        try {
            const avaliacao = await prisma.avaliacao.findUnique({
                where: { id: Number(id) },
                include: { projeto: true, avaliador: true }
            });
            if (!avaliacao) {
                return res.status(404).json({ erro: "Avaliação não encontrada" });
            }
            res.json(avaliacao);
        } catch (err) {
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    async createAvaliacao(req, res) {
        try {
            const dados = avaliacaoSchema.parse(req.body);

            // Regra: avaliador não pode avaliar o próprio projeto
            const projeto = await prisma.projeto.findUnique({
                where: { id: dados.projetoId },
                include: { autor: true }
            });
            const avaliador = await prisma.avaliador.findUnique({
                where: { id: dados.avaliadorId }
            });

            if (!projeto || !avaliador) {
                return res.status(400).json({ erro: "Projeto ou Avaliador inválido" });
            }

            const autoresDoProjeto = await prisma.autorProjeto.findMany({
                where: { projetoId: projeto.id }
            });

            if (autoresDoProjeto.some(a => a.autorId === dados.avaliadorId)) {
                return res.status(400).json({ erro: "Avaliador não pode avaliar o próprio projeto" });
            }

            const novaAvaliacao = await prisma.avaliacao.create({ data: dados });
            res.status(201).json(novaAvaliacao);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async updateAvaliacao(req, res) {
        const { id } = req.params;
        try {
            const dados = avaliacaoSchema.parse(req.body);
            const atualizada = await prisma.avaliacao.update({
                where: { id: Number(id) },
                data: dados
            });
            res.json(atualizada);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async deleteAvaliacao(req, res) {
        const { id } = req.params;
        try {
            await prisma.avaliacao.delete({ where: { id: Number(id) } });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ erro: "Erro ao deletar avaliação" });
        }
    }
};

export default AvaliacaoController;
