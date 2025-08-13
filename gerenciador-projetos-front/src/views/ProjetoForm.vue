<template>
  <div>
    <h2 class="bg-primary p-2 text-white">{{ id ? 'Editar Projeto' : 'Novo Projeto' }}</h2>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Título</label>
        <input v-model="projeto.titulo" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Descrição</label>
        <textarea v-model="projeto.descricao" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Autores</label>
        <select v-model="projeto.autorIds" class="form-select" multiple required>
          <option v-for="autor in autores" :key="autor.id" :value="autor.id">
            {{ autor.nome }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Prêmio</label>
        <select v-model="projeto.premioId" class="form-select">
          <option :value="null">-- Nenhum --</option>
          <option v-for="premio in premios" :key="premio.id" :value="premio.id">
            {{ premio.nome }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary me-2">Salvar</button>
      <router-link class="btn btn-secondary" to="/projetos">Cancelar</router-link>
    </form>

    <div v-if="erro" class="alert alert-danger mt-3">{{ erro }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projeto: {
        titulo: '',
        descricao: '',
        autorIds: [],
        premioId: null
      },
      autores: [],
      premios: [],
      erro: null,
      id: this.$route.params.id,
    };
  },
  async created() {
    await this.carregarAutores();
    await this.carregarPremios();

    if (this.id) {
      await this.carregarProjeto();
    }
  },
  methods: {
    async carregarAutores() {
      try {
        const res = await axios.get('http://localhost:3000/api/autores');
        this.autores = res.data;
      } catch (err) {
        console.error('Erro ao carregar autores:', err);
      }
    },
    async carregarPremios() {
      try {
        const res = await axios.get('http://localhost:3000/api/premios');
        this.premios = res.data;
      } catch (err) {
        console.error('Erro ao carregar prêmios:', err);
      }
    },
    async carregarProjeto() {
      try {
        const res = await axios.get(`http://localhost:3000/api/projetos/${this.id}`);
        this.projeto.titulo = res.data.titulo;
        this.projeto.descricao = res.data.descricao;
        this.projeto.autorIds = res.data.autores.map(a => a.id);
        this.projeto.premioId = res.data.premio ? res.data.premio.id : null;
      } catch (err) {
        console.error('Erro ao carregar projeto:', err);
      }
    },
    async salvar() {
      try {
        this.erro = null;
        if (this.id) {
          await axios.put(`http://localhost:3000/api/projetos/${this.id}`, this.projeto);
        } else {
          await axios.post('http://localhost:3000/api/projetos', this.projeto);
        }
        this.$router.push('/projetos');
      } catch (err) {
        console.error('Erro ao salvar projeto:', err);
        if (err.response && err.response.data && err.response.data.erro) {
          this.erro = Array.isArray(err.response.data.erro)
              ? err.response.data.erro.map(e => e.message).join(', ')
              : err.response.data.erro;
        } else {
          this.erro = 'Erro desconhecido ao salvar projeto.';
        }
      }
    },
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
.me-2 {
  margin-right: 0.5rem;
}
</style>
