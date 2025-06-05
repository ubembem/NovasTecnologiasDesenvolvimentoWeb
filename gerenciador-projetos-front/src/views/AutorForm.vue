<template>
  <div>
    <h2 class="bg-primary">{{ id ? 'Editar Autor' : 'Novo Autor' }}</h2>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="autor.nome" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">E-mail</label>
        <textarea v-model="autor.email" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <router-link class="btn btn-secondary" to="/autores">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      autor: { nome: '', email: '' },
      id: this.$route.params.id,
    };
  },
  async created() {
    if (this.id) {
      await this.carregarAutor();
    }
  },
  methods: {
    async carregarAutor() {
      try {
        const response = await axios.get(`http://localhost:3000/api/autores/${this.id}`);
        this.autor = response.data;
      } catch (error) {
        console.error('Erro ao carregar autor:', error);
      }
    },
    async salvar() {
      try {
        if (this.id) {
          await axios.put(`http://localhost:3000/api/autores/${this.id}`, this.autor);
        } else {
          await axios.post('http://localhost:3000/api/autores', this.autor);
        }
        this.$router.push('/autores');
      } catch (error) {
        console.error('Erro ao salvar autor:', error);
      }
    },
  },
};
</script>