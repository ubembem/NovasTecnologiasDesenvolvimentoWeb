<template>
  <div>
    <h2 class="bg-primary p-2 text-white">{{ id ? 'Editar Avaliação' : 'Nova Avaliação' }}</h2>

    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Projeto</label>
        <select v-model="avaliacao.projetoId" class="form-select" required>
          <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
            {{ projeto.titulo }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Avaliador</label>
        <select v-model="avaliacao.avaliadorId" class="form-select" required>
          <option v-for="avaliador in avaliadores" :key="avaliador.id" :value="avaliador.id">
            {{ avaliador.nome }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Nota</label>
        <input type="number" min="0" max="10" step="0.1" v-model.number="avaliacao.nota" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Comentário</label>
        <textarea v-model="avaliacao.comentario" class="form-control"></textarea>
      </div>

      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <router-link class="btn btn-secondary" to="/avaliacoes">Cancelar</router-link>

      <div v-if="erro" class="alert alert-danger mt-3">{{ erro }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      avaliacao: { projetoId: '', avaliadorId: '', nota: '', comentario: '' },
      projetos: [],
      avaliadores: [],
      erro: null,
      id: this.$route.params.id,
    };
  },
  async created() {
    await this.carregarProjetos();
    await this.carregarAvaliadores();

    if (this.id) {
      await this.carregarAvaliacao();
    }
  },
  methods: {
    async carregarProjetos() {
      try {
        const res = await axios.get('http://localhost:3000/api/projetos');
        this.projetos = res.data;
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
      }
    },
    async carregarAvaliadores() {
      try {
        const res = await axios.get('http://localhost:3000/api/avaliadores');
        this.avaliadores = res.data;
      } catch (err) {
        console.error('Erro ao carregar avaliadores:', err);
      }
    },
    async carregarAvaliacao() {
      try {
        const res = await axios.get(`http://localhost:3000/api/avaliacoes/${this.id}`);
        this.avaliacao = {
          projetoId: res.data.projetoId,
          avaliadorId: res.data.avaliadorId,
          nota: res.data.nota,
          comentario: res.data.comentario
        };
      } catch (err) {
        console.error('Erro ao carregar avaliação:', err);
      }
    },
    async salvar() {
      try {
        this.erro = null;
        if (this.id) {
          await axios.put(`http://localhost:3000/api/avaliacoes/${this.id}`, this.avaliacao);
        } else {
          await axios.post('http://localhost:3000/api/avaliacoes', this.avaliacao);
        }
        this.$router.push('/avaliacoes');
      } catch (err) {
        console.error('Erro ao salvar avaliação:', err);
        if (err.response && err.response.data && err.response.data.erro) {
          this.erro = err.response.data.erro;
        } else {
          this.erro = 'Erro desconhecido ao salvar avaliação.';
        }
      }
    },
  },
};
</script>

<!--<style scoped>-->
<!--.mb-3 { margin-bottom: 1rem; }-->
<!--.me-2 { margin-right: 0.5rem; }-->
<!--</style>-->
