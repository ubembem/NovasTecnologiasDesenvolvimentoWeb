// services/AvaliadorService.js
class AvaliadorService {
    static async getAvaliadores(prisma) {
        return prisma.avaliador.findMany();
    }

    static async getAvaliadorById(prisma, id) {
        return prisma.avaliador.findUnique({ where: { id: parseInt(id) } });
    }

    static async createAvaliador(prisma, data) {
        return prisma.avaliador.create({ data });
    }

    static async updateAvaliador(prisma, id, data) {
        return prisma.avaliador.update({ where: { id: parseInt(id) }, data });
    }

    static async deleteAvaliador(prisma, id) {
        return prisma.avaliador.delete({ where: { id: parseInt(id) } });
    }
}

export default AvaliadorService;
