// src/controllers/ProjetoController.js
import prisma from '../lib/prismaClient.js';
import { z } from 'zod';

const projetoSchema = z.object({
    titulo: z.string().min(1),
    resumo: z.string(),
    area: z.string(),
    autorIds: z.array(z.number()).min(1, "Pelo menos um autor é obrigatório."),
    premioId: z.number().int()
});

const ProjetoController = {
    async getAllProjetos(req, res) {
        try {
            const projetos = await prisma.projeto.findMany({
                include: { autores: true, premio: true }
            });
            res.json(projetos);
        } catch (err) {
            res.status(500).json({ erro: "Erro ao buscar projetos" });
        }
    },

    async getProjetoById(req, res) {
        const { id } = req.params;
        try {
            const projeto = await prisma.projeto.findUnique({
                where: { id: Number(id) },
                include: { autores: true, premio: true }
            });
            if (!projeto) {
                return res.status(404).json({ erro: "Projeto não encontrado" });
            }
            res.json(projeto);
        } catch (err) {
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    async createProjeto(req, res) {
        try {
            const { titulo, autorIds } = req.body;

            if (!autorIds || autorIds.length === 0) {
                return res.status(400).json({ erro: 'É obrigatório informar pelo menos um autor para o projeto.' });
            }

            const projeto = await prisma.projeto.create({
                data: {
                    titulo,
                    autores: {
                        connect: autorIds.map(id => ({ id })),
                    },
                },
                include: {
                    autores: true,
                }
            });

            res.status(201).json(projeto);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async updateProjeto(req, res) {
        const { id } = req.params;
        try {
            const dados = projetoSchema.parse(req.body);
            const atualizado = await prisma.projeto.update({
                where: { id: Number(id) },
                data: dados
            });
            res.json(atualizado);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async deleteProjeto(req, res) {
        const { id } = req.params;
        try {
            await prisma.projeto.delete({ where: { id: Number(id) } });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ erro: "Erro ao deletar projeto" });
        }
    }
};

export default ProjetoController;
