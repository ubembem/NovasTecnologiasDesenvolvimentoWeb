export class AutorDTO {
    constructor(autor) {
        this.id = autor.id;
        this.nome = autor.nome;
        this.email = autor.email;
        this.createdAt = autor.createdAt;
        this.projetos = autor.projetos
            ? autor.projetos.map((projeto) => ({
                id: projeto.id,
                titulo: projeto.titulo,
                descricao: projeto.descricao,
                premioId: projeto.premioId,
            }))
            : [];
    }
}