export class ProjetoVencedorDTO {
    constructor(projeto, notaMedia) {
        this.id = projeto.id;
        this.titulo = projeto.titulo;
        this.descricao = projeto.descricao;
        this.notaMedia = notaMedia;
        this.autor = projeto.autor ? { id: projeto.autor.id, nome: projeto.autor.nome, email: projeto.autor.email, createdAt: projeto.autor.createdAt } : null;
        this.premio = projeto.premio ? { id: projeto.premio.id, nome: projeto.premio.nome, descricao: projeto.premio.descricao, ano: projeto.premio.ano, createdAt: projeto.premio.createdAt } : null;
    }
}