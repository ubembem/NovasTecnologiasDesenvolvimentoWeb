class PremioService {
    static async getPremios(prisma) {
        return prisma.premio.findMany();
    }

    static async getPremioById(prisma, id) {
        return prisma.premio.findUnique({ where: { id: parseInt(id) } });
    }

    static async createPremio(prisma, data) {
        return prisma.premio.create({ data });
    }

    static async updatePremio(prisma, id, data) {
        return prisma.premio.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async deletePremio(prisma, id) {
        return prisma.premio.delete({ where: { id: parseInt(id) } });
    }
}

export default PremioService;