class AvaliacaoService {
    static async getAvaliacoes(prisma) {
        return prisma.avaliacao.findMany({
            include: {
                avaliador: true,
                projeto: true,
            },
        });
    }

    static async getAvaliacaoById(prisma, id) {
        return prisma.avaliacao.findUnique({
            where: { id: parseInt(id) },
            include: {
                avaliador: true,
                projeto: true,
            },
        });
    }

    static async createAvaliacao(prisma, data) {
        return prisma.avaliacao.create({
            data,
            include: {
                avaliador: true,
                projeto: true,
            },
        });
    }

    static async updateAvaliacao(prisma, id, data) {
        return prisma.avaliacao.update({ where: { id: parseInt(id) }, data });
    }

    static async deleteAvaliacao(prisma, id) {
        return prisma.avaliacao.delete({ where: { id: parseInt(id) } });
    }
}

export default AvaliacaoService;
