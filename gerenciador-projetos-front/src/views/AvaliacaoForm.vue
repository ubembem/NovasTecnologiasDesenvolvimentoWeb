<template>
  <div>
    <h2 class="bg-primary">{{ id ? 'Editar Avaliacaoo' : 'Novo Avaliacao' }}</h2>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Projeto Id</label>
        <input v-model="avaliacao.projetoId" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Avaliador Id</label>
        <textarea v-model="avaliacao.avaliadorId" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Nota</label>
        <textarea v-model="avaliacao.nota" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Comentário</label>
        <textarea v-model="avaliacao.comentario" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <router-link class="btn btn-secondary" to="/avaliacoes">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      avaliacao: { projetoId: '', avaliadorId: '', nota: '', comentario: '' },
      id: this.$route.params.id,
    };
  },
  async created() {
    if (this.id) {
      await this.carregarAvaliacao();
    }
  },
  methods: {
    async carregarAvaliacao() {
      try {
        const response = await axios.get(`http://localhost:3000/api/avaliacoes/${this.id}`);
        this.avaliacao = response.data;
      } catch (error) {
        console.error('Erro ao carregar avaliacao:', error);
      }
    },
    async salvar() {
      try {
        if (this.id) {
          await axios.put(`http://localhost:3000/api/avaliacoes/${this.id}`, this.avaliacao);
        } else {
          await axios.post('http://localhost:3000/api/avaliacoes', this.avaliacao);
        }
        this.$router.push('/avaliacoes');
      } catch (error) {
        console.error('Erro ao salvar avaliacao:', error);
      }
    },
  },
};
</script>