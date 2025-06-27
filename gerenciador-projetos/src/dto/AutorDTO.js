export class AutorDTO {
    constructor(autor) {
        this.id = autor.id;
        this.nome = autor.nome;
        this.email = autor.email;
        this.cpf = autor.cpf;
        this.telefone = autor.telefone;
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