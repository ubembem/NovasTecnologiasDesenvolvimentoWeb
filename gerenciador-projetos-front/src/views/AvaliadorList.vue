<template>
  <div class="table-responsive">
    <h2>Avaliadores</h2>
    <router-link class="btn btn-primary mb-4" to="/avaliadores/novo">Novo Avaliador</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>E-mail</th>
        <th>Telefone</th>
        <th>Data criação</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="avaliador in avaliadores" :key="avaliador.id">
        <td>{{ avaliador.id }}</td>
        <td>{{ avaliador.nome }}</td>
        <td>{{ avaliador.cpf }}</td>
        <td>{{ avaliador.email }}</td>
        <td>{{ avaliador.telefone }}</td>
        <td>{{ formatarData(avaliador.createdAt) }}</td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/avaliadores/editar/${avaliador.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarAvaliador(avaliador.id)">Excluir</button>
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
      avaliadores: [],
    };
  },
  async created() {
    await this.carregarAvaliadores();
  },
  methods: {
    async carregarAvaliadores() {
      try {
        const response = await axios.get('http://localhost:3000/api/avaliadores');
        this.avaliadores = response.data;
      } catch (error) {
        console.error('Erro ao carregar avaliadores:', error);
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
    async deletarAvaliador(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/avaliadores/${id}`);
          this.carregarAvaliadores();
        } catch (error) {
          console.error('Erro ao excluir avaliadores:', error);
        }
      }
    },
  },
};
</script>