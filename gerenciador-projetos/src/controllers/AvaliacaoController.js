// src/controllers/AvaliacaoController.js
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema de validação
const avaliacaoSchema = z.object({
    projetoId: z.number(),
    avaliadorId: z.number(),
    nota: z.number().min(0).max(10, "Nota deve ser entre 0 e 10"),
    comentario: z.string().optional(),
});

const AvaliacaoController = {
    // Listar todas as avaliações
    async getAllAvaliacoes(req, res) {
        try {
            const avaliacoes = await prisma.avaliacao.findMany({
                orderBy: { id: 'asc' },
                include: {
                    projeto: true,
                    avaliador: true,
                },
            });
            res.json(avaliacoes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ erro: "Erro ao buscar avaliações" });
        }
    },

    // Buscar avaliação por ID
    async getAvaliacaoById(req, res) {
        const { id } = req.params;
        try {
            const avaliacao = await prisma.avaliacao.findUnique({
                where: { id: Number(id) },
                include: { projeto: true, avaliador: true },
            });

            if (!avaliacao) {
                return res.status(404).json({ erro: "Avaliação não encontrada" });
            }

            res.json(avaliacao);
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    async createAvaliacao(req, res) {
        try {
            const dados = avaliacaoSchema.parse(req.body);

            // Buscar projeto com autores
            const projeto = await prisma.projeto.findUnique({
                where: { id: dados.projetoId },
                include: { autores: true },
            });

            if (!projeto) {
                return res.status(404).json({ erro: "Projeto não encontrado" });
            }

            // Buscar avaliador para pegar CPF
            const avaliador = await prisma.avaliador.findUnique({
                where: { id: dados.avaliadorId },
            });

            if (!avaliador) {
                return res.status(404).json({ erro: "Avaliador não encontrado" });
            }

            // Comparar CPF do avaliador com os CPFs dos autores do projeto
            const isAutor = projeto.autores.some(a => a.cpf === avaliador.cpf);
            if (isAutor) {
                return res.status(400).json({ erro: "O avaliador não pode avaliar um projeto do qual é autor" });
            }

            const avaliacao = await prisma.avaliacao.create({
                data: {
                    projeto: { connect: { id: dados.projetoId } },
                    avaliador: { connect: { id: dados.avaliadorId } },
                    nota: dados.nota,
                    comentario: dados.comentario ?? null,
                },
                include: { projeto: true, avaliador: true },
            });

            res.status(201).json(avaliacao);
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async updateAvaliacao(req, res) {
        const { id } = req.params;
        try {
            const dados = avaliacaoSchema.parse(req.body);

            // Buscar projeto com autores
            const projeto = await prisma.projeto.findUnique({
                where: { id: dados.projetoId },
                include: { autores: true },
            });

            if (!projeto) {
                return res.status(404).json({ erro: "Projeto não encontrado" });
            }

            // Buscar avaliador para pegar CPF
            const avaliador = await prisma.avaliador.findUnique({
                where: { id: dados.avaliadorId },
            });

            if (!avaliador) {
                return res.status(404).json({ erro: "Avaliador não encontrado" });
            }

            // Comparar CPF do avaliador com os CPFs dos autores do projeto
            const isAutor = projeto.autores.some(a => a.cpf === avaliador.cpf);
            if (isAutor) {
                return res.status(400).json({ erro: "O avaliador não pode avaliar um projeto do qual é autor" });
            }

            const atualizado = await prisma.avaliacao.update({
                where: { id: Number(id) },
                data: {
                    projeto: { connect: { id: dados.projetoId } },
                    avaliador: { connect: { id: dados.avaliadorId } },
                    nota: dados.nota,
                    comentario: dados.comentario ?? null,
                },
                include: { projeto: true, avaliador: true },
            });

            res.json(atualizado);
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },
    // Excluir avaliação
    async deleteAvaliacao(req, res) {
        const { id } = req.params;
        try {
            await prisma.avaliacao.delete({
                where: { id: Number(id) },
            });
            res.status(204).send(); // sucesso, sem conteúdo
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: "Erro ao deletar avaliação" });
        }
    }
};

export default AvaliacaoController;

