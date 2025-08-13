<template>
  <div class="table-responsive">
    <h2>Avaliações</h2>
    <router-link class="btn btn-primary mb-4" to="/avaliacoes/novo">Novo Avaliação</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>ID do projeto</th>
        <th>ID do avaliador</th>
        <th>Nota</th>
        <th>Comentário</th>
        <th>Data de criação</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="avaliacao in avaliacoes" :key="avaliacao.id">
        <td>{{ avaliacao.id }}</td>
<!--        <td>{{ avaliacao.projeto ? avaliacao.projeto.titulo : 'N/A' }}</td>-->
<!--        <td>{{ avaliacao.avaliador ? avaliacao.avaliador.nome : 'N/A' }}</td>-->
        <td>{{ avaliacao.projetoId }}</td>
        <td>{{ avaliacao.avaliadorId }}</td>
        <td>{{ avaliacao.nota }}</td>
        <td>{{ avaliacao.comentario }}</td>
        <td>{{ formatarData(avaliacao.createdAt) }}</td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/avaliacoes/editar/${avaliacao.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarAvaliacao(avaliacao.id)">Excluir</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      avaliacoes: [],
    };
  },
  async created() {
    await this.carregarAvaliacoes();
  },
  methods: {
    async carregarAvaliacoes() {
      try {
        const response = await axios.get('http://localhost:3000/api/avaliacoes');
        this.avaliacoes = response.data;
      } catch (error) {
        console.error('Erro ao carregar avaliacoes:', error);
      }
    },
    formatarData(isoDate) {
      if (!isoDate) return '';
      const data = new Date(isoDate);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    async deletarAvaliacao(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/avaliacoes/${id}`);
          this.carregarAvaliacoes();
        } catch (error) {
          console.error('Erro ao excluir avaliacao:', error);
        }
      }
    },
  },
};
</script>