import { PrismaClient } from '@prisma/client';
import { ProjetoDTO } from '../dto/ProjetoDTO.js';
import { AutorDTO } from '../dto/AutorDTO.js';
import { AvaliacaoDTO } from '../dto/AvaliacaoDTO.js';
import { ProjetoVencedorDTO } from '../dto/ProjetoVencedorDTO.js';

const prisma = new PrismaClient();

export class ConsultaService {
    static async listarProjetosComAutores() {
        const projetos = await prisma.projeto.findMany({
            include: { autor: true, premio: true },
        });
        return projetos.map((projeto) => new ProjetoDTO(projeto));
    }

    static async listarAutoresComProjetos() {
        const autores = await prisma.autor.findMany({
            include: { projetos: { include: { premio: true } } },
        });
        return autores.map((autor) => new AutorDTO(autor));
    }

    static async listarProjetosNaoAvaliados() {
        const projetos = await prisma.projeto.findMany({
            where: { avaliacoes: { none: {} } },
            include: { autor: true, premio: true },
        });
        return projetos.map((projeto) => new ProjetoDTO(projeto));
    }

    static async listarProjetosAvaliados() {
        const projetos = await prisma.projeto.findMany({
            where: { avaliacoes: { some: {} } },
            include: {
                autor: true,
                premio: true,
                avaliacoes: { include: { avaliador: true, projeto: true } },
            },
        });
        return projetos.map((projeto) => ({
            ...new ProjetoDTO(projeto),
            avaliacoes: projeto.avaliacoes.map((avaliacao) => new AvaliacaoDTO(avaliacao)),
        }));
    }

    static async listarProjetosVencedores() {
        const premios = await prisma.premio.findMany({
            include: {
                projetos: {
                    where: { avaliacoes: { some: {} } },
                    include: { autor: true, premio: true, avaliacoes: true },
                },
            },
        });

        console.log('Prêmios encontrados:', premios); // Depuração

        const vencedores = [];

        for (const premio of premios) {
            const projetos = premio.projetos;
            console.log(`Projetos para prêmio ${premio.nome}:`, projetos); // Depuração
            if (projetos.length === 0) continue;

            const projetosComNota = projetos.map((projeto) => {
                const notaMedia = projeto.avaliacoes.reduce((sum, av) => sum + av.nota, 0) / projeto.avaliacoes.length;
                return { projeto, notaMedia };
            });

            console.log(`Projetos com nota para prêmio ${premio.nome}:`, projetosComNota); // Depuração

            // Encontrar o projeto com a maior nota média (primeiro em caso de empate)
            const vencedor = projetosComNota.reduce((max, curr) =>
                curr.notaMedia >= max.notaMedia ? curr : max
            );

            console.log(`Vencedor para prêmio ${premio.nome}:`, vencedor); // Depuração

            vencedores.push(new ProjetoVencedorDTO(vencedor.projeto, vencedor.notaMedia));
        }

        console.log('Vencedores finais:', vencedores); // Depuração
        return vencedores;
    }
}