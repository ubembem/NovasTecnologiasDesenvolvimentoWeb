import { ConsultaService } from '../services/ConsultaService.js';

export class ConsultaController {
    static async listarProjetosComAutores(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosComAutores();
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar projetos com autores' });
        }
    }

    static async listarAutoresComProjetos(req, res) {
        try {
            const autores = await ConsultaService.listarAutoresComProjetos();
            res.json(autores);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar autores com projetos' });
        }
    }

    static async listarProjetosNaoAvaliados(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosNaoAvaliados();
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar projetos não avaliados' });
        }
    }

    static async listarProjetosAvaliados(req, res) {
        try {
            const projetos = await ConsultaService.listarProjetosAvaliados();
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar projetos avaliados' });
        }
    }

    static async listarProjetosVencedores() {
        // Buscar todos os prêmios com projetos que têm avaliações
        const premios = await prisma.premio.findMany({
            include: {
                projetos: {
                    where: { avaliacoes: { some: {} } },
                    include: { autor: true, premio: true, avaliacoes: true },
                },
            },
        });

        const vencedores = [];

        for (const premio of premios) {
            const projetos = premio.projetos;
            if (projetos.length === 0) continue; // Ignorar prêmios sem projetos avaliados

            // Calcular nota média para cada projeto
            const projetosComNota = projetos.map((projeto) => {
                const notaMedia = projeto.avaliacoes.reduce((sum, av) => sum + av.nota, 0) / projeto.avaliacoes.length;
                return { projeto, notaMedia };
            });

            // Encontrar o projeto com a maior nota média
            const vencedor = projetosComNota.reduce((max, curr) =>
                curr.notaMedia > max.notaMedia ? curr : max
            );

            vencedores.push(new ProjetoVencedorDTO(vencedor.projeto, vencedor.notaMedia));
        }

        return vencedores;
    }
}