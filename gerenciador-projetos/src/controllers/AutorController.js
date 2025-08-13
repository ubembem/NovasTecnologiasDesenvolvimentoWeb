// src/controllers/AutorController.js
import prisma from '../lib/prismaClient.js';
import { z } from 'zod';

const autorSchema = z.object({
    nome: z.string().min(1),
    email: z.string().email(),
    cpf: z.string().min(11).max(14),
    telefone: z.string()
});

const AutorController = {
    async getAllAutores(req, res) {
        try {
            const autores = await prisma.autor.findMany({
                orderBy: { id: 'asc' }
            });
            res.json(autores);
        } catch (err) {
            res.status(500).json({ erro: "Erro ao buscar autores" });
        }
    },

    async getAutorById(req, res) {
        const { id } = req.params;
        try {
            const autor = await prisma.autor.findUnique({
                where: { id: Number(id) }
            });
            if (!autor) {
                return res.status(404).json({ erro: "Autor não encontrado" });
            }
            res.json(autor);
        } catch (err) {
            res.status(400).json({ erro: "ID inválido" });
        }
    },

    async createAutor(req, res) {
        try {
            const dados = autorSchema.parse(req.body);
            const novo = await prisma.autor.create({ data: dados });
            res.status(201).json(novo);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async updateAutor(req, res) {
        const { id } = req.params;
        try {
            const dados = autorSchema.parse(req.body);
            const atualizado = await prisma.autor.update({
                where: { id: Number(id) },
                data: { nome: dados.nome,
                    email: dados.email,
                    cpf: dados.cpf,
                    telefone: dados.telefone
                }
            });
            res.json(atualizado);
        } catch (err) {
            res.status(400).json({ erro: err.errors ?? err.message });
        }
    },

    async deleteAutor(req, res) {
        const { id } = req.params;
        try {
            await prisma.autor.delete({ where: { id: Number(id) } });
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ erro: "Erro ao deletar autor" });
        }
    }
};

export default AutorController;
