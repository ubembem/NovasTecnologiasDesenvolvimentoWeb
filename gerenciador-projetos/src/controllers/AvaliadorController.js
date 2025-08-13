// src/controllers/AvaliadorController.js
import prisma from '../lib/prismaClient.js';
import { z } from 'zod';

const avaliadorSchema = z.object({
    nome: z.string().min(1),
    email: z.string().email(),
    cpf: z.string().min(11).max(14),
    telefone: z.string()
});

const AvaliadorController = {
    async getAllAvaliadores(req, res) {
        try {
            const avaliadores = await prisma.avaliador.findMany({
                orderBy: { id: 'asc' }
            });
            res.json(avaliadores);
        } catch (err) {
            res.status(500).json({ erro: "Erro ao buscar avaliadores" });
        }
    },

    async getAvaliadorById(req, res) {
        const { id } = req.params;
        try {
            const avaliador = await prisma.avaliador.findUnique({
                where: { id: Number(id) }
            });
            if (!avaliador) {
                return res.status(404).json({ erro: "Avaliador não encontrado" });
            }
            res.json(avaliador);
        } catch (err) {
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    async createAvaliador(req, res) {
        try {
            const dados = avaliadorSchema.parse(req.body);
            const novo = await prisma.avaliador.create({ data: dados });
            res.status(201).json(novo);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async updateAvaliador(req, res) {
        const { id } = req.params;
        try {
            const dados = avaliadorSchema.parse(req.body);
            const atualizado = await prisma.avaliador.update({
                where: { id: Number(id) },
                data: dados
            });
            res.json(atualizado);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async deleteAvaliador(req, res) {
        const { id } = req.params;
        try {
            await prisma.avaliador.delete({ where: { id: Number(id) } });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ erro: "Erro ao deletar avaliador" });
        }
    }
};

export default AvaliadorController;
