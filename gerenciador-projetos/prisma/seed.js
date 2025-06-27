import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Prêmios
    await prisma.premio.createMany({
        data: [
            {
                nome: 'Inovação Tecnológica',
                descricao: 'Premiação para projetos com soluções tecnológicas inovadoras',
                ano: 2025,
                dataInicial: new Date('2025-01-01'),
                dataFinal: new Date('2025-12-31'),
            },
            {
                nome: 'Sustentabilidade',
                descricao: 'Reconhecimento para projetos que promovam o desenvolvimento sustentável',
                ano: 2025,
                dataInicial: new Date('2025-02-01'),
                dataFinal: new Date('2025-11-30'),
            },
        ],
    });
    console.log('Prêmios criados!');

    // Projetos
    await prisma.projeto.createMany({
        data: [
            {
                titulo: 'Plataforma de Aulas Online',
                descricao: 'Sistema web para conectar professores e alunos remotamente.',
                createdAt: new Date(),
                premioId: 1,
            },
            {
                titulo: 'App de Coleta Seletiva',
                descricao: 'Aplicativo para incentivar a reciclagem em bairros urbanos.',
                createdAt: new Date(),
                premioId: 2,
            },
        ],
    });
    console.log('Projetos criados!');

    // Avaliações
    await prisma.avaliacao.createMany({
        data: [
            {
                projetoId: 1,
                avaliadorId: 1,
                nota: 9.5,
                comentario: 'Projeto muito inovador e com grande impacto social.',
                createdAt: new Date(),
            },
            {
                projetoId: 2,
                avaliadorId: 2,
                nota: 8.7,
                comentario: 'Boa proposta para sustentabilidade urbana.',
                createdAt: new Date(),
            },
        ],
    });
    console.log('Avaliações criadas!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
