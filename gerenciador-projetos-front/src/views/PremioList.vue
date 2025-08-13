<template>
  <div class="table-responsive">
    <h2>Prêmios</h2>
    <router-link class="btn btn-primary mb-4" to="/premios/novo">Novo Prêmio</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Ano</th>
        <th>Data de criação</th>
        <th>Data inicial</th>
        <th>Data final</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="premio in premios" :key="premio.id">
        <td>{{ premio.id }}</td>
        <td>{{ premio.nome }}</td>
        <td>{{ premio.descricao }}</td>
        <td>{{ premio.ano }}</td>
        <td>{{ formatarData(premio.dataCriacao) }}</td>
        <td>{{ formatarData(premio.dataInicial) }}</td>
        <td>{{ formatarData(premio.dataFinal) }}</td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/premios/editar/${premio.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarPremio(premio.id)">Excluir</button>
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
      premios: [],
    };
  },
  async created() {
    await this.carregarPremios();
  },
  methods: {
    async carregarPremios() {
      try {
        const response = await axios.get('http://localhost:3000/api/premios');
        this.premios = response.data;
      } catch (error) {
        console.error('Erro ao carregar prêmios:', error);
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
    async deletarPremio(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/premios/${id}`);
          this.carregarPremios();
        } catch (error) {
          console.error('Erro ao excluir prêmio:', error);
        }
      }
    },
  },
}

</script>