import AutorService from "../services/AutorService.js";

class AutorController {
    static async getAllAutores(req, res) {
        try {
            const autores = await AutorService.getAutores(req.prisma);
            console.log("Sem autores ainda teste")
            res.json(autores);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar autores" });
        }
    }

    static async getAutorById(req, res) {
        try {
            const autor = await AutorService.getAutorById(req.prisma, req.params.id);
            if (!autor) {
                return res.status(404).json({ error: "Autor não encontrado" });
            }
            res.json(autor);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar autor" });
        }
    }

    static async createAutor(req, res) {
        try {
            const autor = await AutorService.createAutor(req.prisma, req.body);
            res.status(201).json(autor);
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar autor" });
        }
    }

    static async updateAutor(req, res) {
        try {
            const autor = await AutorService.updateAutor(req.prisma, req.params.id, req.body);
            res.json(autor);
        } catch (error) {
            res.status(400).json({ error: "Erro ao atualizar autor" });
        }
    }

    static async deleteAutor(req, res) {
        try {
            await AutorService.deleteAutor(req.prisma, req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: "Erro ao excluir autor" });
        }
    }
}

export default AutorController;