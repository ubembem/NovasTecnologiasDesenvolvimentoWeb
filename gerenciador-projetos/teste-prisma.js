import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testePrisma() {
    try {
        // Testar Premio
        const premios = await prisma.premio.findMany();
        console.log("Prêmios:", premios);

        // Testar Autor
        const autores = await prisma.autor.findMany();
        console.log("Autores:", autores);

        // Testar Avaliador
        const avaliadores = await prisma.avaliador.findMany();
        console.log("Avaliadores:", avaliadores);

        // Testar Projeto
        const projetos = await prisma.projeto.findMany();
        console.log("Projetos:", projetos);

        // Testar Avaliacao
        const avaliacoes = await prisma.avaliacao.findMany();
        console.log("Avaliações:", avaliacoes);
    } catch (error) {
        console.error("Erro:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testePrisma();