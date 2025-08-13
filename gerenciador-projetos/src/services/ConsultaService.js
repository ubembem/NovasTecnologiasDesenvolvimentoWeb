// services/ConsultaService.js
import prisma from '../lib/prismaClient.js';

export class ConsultaService {

    // Listar todos os projetos com seus autores
    static async listarProjetosComAutores() {
        return prisma.projeto.findMany({
            include: {
                autores: true,
                premio: true,
                avaliacoes: true
            },
            orderBy: { id: 'asc' }
        });
    }

    // Listar todos os autores com seus projetos
    static async listarAutoresComProjetos() {
        return prisma.autor.findMany({
            include: {
                projetos: {
                    include: { premio: true } // inclui prêmio do projeto
                }
            },
            orderBy: { id: 'asc' }
        });
    }

    // Listar projetos que ainda não possuem avaliações
    static async listarProjetosNaoAvaliados() {
        return prisma.projeto.findMany({
            where: {
                avaliacoes: { none: {} } // projetos sem avaliações
            },
            include: {
                autores: true,
                premio: true,
                avaliacoes: true
            },
            orderBy: { id: 'asc' }
        });
    }

    // Listar projetos que possuem pelo menos uma avaliação
    static async listarProjetosAvaliados() {
        return prisma.projeto.findMany({
            where: {
                avaliacoes: { some: {} } // projetos com avaliações
            },
            include: {
                autores: true,
                premio: true,
                avaliacoes: true
            },
            orderBy: { id: 'asc' }
        });
    }

    // Lista projetos vencedores por premiação
    static async listarProjetosVencedores() {
        // Pega todos os projetos com autores, prêmio e avaliações
        const projetos = await prisma.projeto.findMany({
            where: { premioId: { not: null } }, // apenas projetos com prêmio
            include: {
                autores: true,
                premio: true,
                avaliacoes: true,
            },
        });

        // Agrupa projetos por premioId
        const premiosMap = {};
        projetos.forEach(p => {
            const notas = p.avaliacoes.map(a => a.nota);
            const notaMedia = notas.length > 0 ? notas.reduce((a,b)=>a+b,0)/notas.length : 0;
            if (!premiosMap[p.premioId]) {
                premiosMap[p.premioId] = [];
            }
            premiosMap[p.premioId].push({ ...p, notaMedia });
        });

        // Para cada premiação, seleciona apenas o projeto com maior nota média
        const vencedores = Object.values(premiosMap).map(projs => {
            return projs.reduce((prev, current) => (current.notaMedia > prev.notaMedia ? current : prev));
        });

        return vencedores;
    }
}
