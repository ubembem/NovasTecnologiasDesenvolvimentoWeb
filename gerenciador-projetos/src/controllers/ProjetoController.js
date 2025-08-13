// src/controllers/ProjetoController.js
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Criando instância do Prisma
const prisma = new PrismaClient();

// Schemas de validação
const projetoCreateSchema = z.object({
    titulo: z.string().min(1, "O título é obrigatório."),
    descricao: z.string().min(1, "A descrição é obrigatória."),
    autorIds: z.array(z.number()).min(1, "Pelo menos um autor é obrigatório."),
    premioId: z.number().optional(),
});

const projetoUpdateSchema = z.object({
    titulo: z.string().min(1, "O título é obrigatório."),
    descricao: z.string().min(1, "A descrição é obrigatória."),
    autorIds: z.array(z.number()).min(1, "Pelo menos um autor é obrigatório."),
    premioId: z.number().optional(),
});

const ProjetoController = {
    // Listar todos os projetos
    async getAllProjetos(req, res) {
        try {
            const projetos = await prisma.projeto.findMany({
                orderBy: { id: 'asc' },
                include: { autores: true, premio: true },
            });
            res.json(projetos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ erro: "Erro ao buscar projetos" });
        }
    },

    // Buscar projeto por ID
    async getProjetoById(req, res) {
        const { id } = req.params;
        try {
            const projeto = await prisma.projeto.findUnique({
                where: { id: Number(id) },
                include: { autores: true, premio: true },
            });

            if (!projeto) {
                return res.status(404).json({ erro: "Projeto não encontrado" });
            }

            res.json(projeto);
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    // Criar projeto
    async createProjeto(req, res) {
        try {
            const dados = projetoCreateSchema.parse(req.body);

            const projeto = await prisma.projeto.create({
                data: {
                    titulo: dados.titulo,
                    descricao: dados.descricao,
                    premioId: dados.premioId ?? null,
                    autores: {
                        connect: dados.autorIds.map(id => ({ id })),
                    },
                },
                include: { autores: true, premio: true },
            });

            res.status(201).json(projeto);
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    // Atualizar projeto
    async updateProjeto(req, res) {
        const { id } = req.params;
        try {
            const dados = projetoUpdateSchema.parse(req.body);

            const atualizado = await prisma.projeto.update({
                where: { id: Number(id) },
                data: {
                    titulo: dados.titulo,
                    descricao: dados.descricao,
                    premioId: dados.premioId ?? null,
                    autores: {
                        set: dados.autorIds.map(aid => ({ id: aid })), // substitui autores
                    },
                },
                include: { autores: true, premio: true },
            });

            res.json(atualizado);
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    // Excluir projeto
    async deleteProjeto(req, res) {
        const { id } = req.params;
        try {
            await prisma.projeto.delete({ where: { id: Number(id) } });
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(400).json({ erro: "Erro ao deletar projeto" });
        }
    },
};

export default ProjetoController;


