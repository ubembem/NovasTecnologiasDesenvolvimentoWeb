<template>
  <div class="table-responsive">
    <h2>Projetos</h2>
    <router-link class="btn btn-primary mb-4" to="/projetos/novo">Novo Projeto</router-link>
    <table class="table table-striped">
      <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Autor</th>
        <th>Prêmio</th>
        <th>Data de criação</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.titulo }}</td>
        <td>{{ projeto.descricao }}</td>
        <td>{{ projeto.autores }}</td>
        <td>{{ projeto.premioId }}</td>
        <td>{{ formatarData(projeto.createdAt) }}</td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/projetos/editar/${projeto.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarProjeto(projeto.id)">Excluir</button>
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
      projetos: [],
    };
  },
  async created() {
    await this.carregarProjetos();
  },
  methods: {
    async carregarProjetos() {
      try {
        const response = await axios.get('http://localhost:3000/api/projetos');
        this.projetos = response.data;
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
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
    async deletarProjeto(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/projetos/${id}`);
          this.carregarProjetos();
        } catch (error) {
          console.error('Erro ao excluir projetos:', error);
        }
      }
    },
  },
};
</script>