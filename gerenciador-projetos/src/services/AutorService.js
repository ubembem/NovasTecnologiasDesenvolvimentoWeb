class AutorService {
    static async getAllAutores(prisma) {
        return prisma.autor.findMany({ include: { projetos: true } });
    }

    static async getAutorById(prisma, id) {
        return prisma.autor.findUnique({
            where: { id: parseInt(id) },
            include: { projetos: true },
        });
    }

    static async createAutor(prisma, data) {
        return prisma.autor.create({ data });
    }

    static async updateAutor(prisma, id, data) {
        return prisma.autor.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async deleteAutor(prisma, id) {
        return prisma.autor.delete({ where: { id: parseInt(id) } });
    }
}

export default AutorService;