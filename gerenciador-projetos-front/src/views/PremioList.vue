<template>
  <div class="bg-primary mb-4">
    <h2>Prêmios</h2>
    <router-link class="btn btn-secondary mb-3" to="/premios/novo">Novo Prêmio</router-link>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Ano</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="premio in premios" :key="premio.id">
        <td>{{ premio.id }}</td>
        <td>{{ premio.nome }}</td>
        <td>{{ premio.descricao }}</td>
        <td>{{ premio.ano }}</td>
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
};
</script>