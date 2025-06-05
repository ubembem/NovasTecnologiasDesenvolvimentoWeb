<template>
  <div class="bg-primary mb-4">
    <h2>Autores</h2>
    <router-link class="btn btn-secondary mb-3" to="/autores/novo">Novo Autor</router-link>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="autor in autores" :key="autor.id">
        <td>{{ autor.id }}</td>
        <td>{{ autor.nome }}</td>
        <td>{{ autor.email }}</td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/autores/editar/${autor.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarAutor(autor.id)">Excluir</button>
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
      autores: [],
    };
  },
  async created() {
    await this.carregarAutores();
  },
  methods: {
    async carregarAutores() {
      try {
        const response = await axios.get('http://localhost:3000/api/autores');
        this.autores = response.data;
      } catch (error) {
        console.error('Erro ao carregar autores:', error);
      }
    },
    async deletarAutor(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/autores/${id}`);
          this.carregarAutores();
        } catch (error) {
          console.error('Erro ao excluir autores:', error);
        }
      }
    },
  },
};
</script>