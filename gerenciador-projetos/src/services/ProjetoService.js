class ProjetoService {
    static async getProjetos(prisma) {
        return prisma.projeto.findMany();
    }

    static async getProjetoById(prisma, id) {
        return prisma.projeto.findUnique({ where: { id: parseInt(id) } });
    }

    static async createProjeto(prisma, data) {
        return prisma.projeto.create({ data });
    }

    static async updateProjeto(prisma, id, data) {
        return prisma.projeto.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async deleteProjeto(prisma, id) {
        return prisma.projeto.delete({ where: { id: parseInt(id) } });
    }
}

export default ProjetoService;