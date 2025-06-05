<template>
  <div>
    <h2 class="bg-primary">{{ id ? 'Editar Projeto' : 'Novo Projeto' }}</h2>
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
        <label class="form-label">Autor</label>
        <textarea v-model="projeto.autorId" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Prêmio</label>
        <textarea v-model="projeto.premioId" class="form-control" required></textarea>
      </div>
<!--      Está dando erro ao criar projeto corrigir depois-->
<!--      <div class="mb-3">-->
<!--        <label class="form-label">Data</label>-->
<!--        <textarea v-model="projeto.createdAt" class="form-control" required></textarea>-->
<!--      </div>-->
      <button type="submit" class="btn btn-primary">Salvar</button>
      <router-link class="btn btn-secondary" to="/projetos">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projeto: { titulo: '', descricao: '', autorId: '', premioId: '' },
      id: this.$route.params.id,
    };
  },
  async created() {
    if (this.id) {
      await this.carregarProjeto();
    }
  },
  methods: {
    async carregarProjeto() {
      try {
        const response = await axios.get(`http://localhost:3000/api/projetos/${this.id}`);
        this.projeto = response.data;
      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
      }
    },
    async salvar() {
      try {
        if (this.id) {
          await axios.put(`http://localhost:3000/api/projetos/${this.id}`, this.projeto);
        } else {
          await axios.post('http://localhost:3000/api/projetos', this.projeto);
        }
        this.$router.push('/projetos');
      } catch (error) {
        console.error('Erro ao salvar projeto:', error);
      }
    },
  },
};
</script>