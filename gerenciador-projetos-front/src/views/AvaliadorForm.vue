<template>
  <div>
    <h2 class="bg-primary">{{ id ? 'Editar Avaliador' : 'Novo Avaliador' }}</h2>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="avaliador.nome" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">CPF</label>
        <textarea v-model="avaliador.cpf" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">E-mail</label>
        <textarea v-model="avaliador.email" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Telefone</label>
        <textarea v-model="avaliador.telefone" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <router-link class="btn btn-secondary" to="/avaliadores">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      avaliador: { nome: '', email: '' },
      id: this.$route.params.id,
    };
  },
  async created() {
    if (this.id) {
      await this.carregarAvaliador();
    }
  },
  methods: {
    async carregarAvaliador() {
      try {
        const response = await axios.get(`http://localhost:3000/api/avaliadores/${this.id}`);
        this.avaliador = response.data;
      } catch (error) {
        console.error('Erro ao carregar avaliador:', error);
      }
    },
    async salvar() {
      try {
        if (this.id) {
          await axios.put(`http://localhost:3000/api/avaliadores/${this.id}`, this.avaliador);
        } else {
          await axios.post('http://localhost:3000/api/avaliadores', this.avaliador);
        }
        this.$router.push('/avaliadores');
      } catch (error) {
        console.error('Erro ao salvar avaliador:', error);
      }
    },
  },
};
</script>