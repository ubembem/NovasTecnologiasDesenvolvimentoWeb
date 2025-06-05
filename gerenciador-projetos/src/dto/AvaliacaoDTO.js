export class AvaliacaoDTO {
    constructor(avaliacao) {
        this.id = avaliacao.id;
        this.nota = avaliacao.nota;
        this.comentario = avaliacao.comentario;
        this.data = avaliacao.createdAt;
        this.projeto = avaliacao.projeto ? { id: avaliacao.projeto.id, titulo: avaliacao.projeto.titulo } : null;
        this.avaliador = avaliacao.avaliador ? { id: avaliacao.avaliador.id, nome: avaliacao.avaliador.nome } : null;
    }
}