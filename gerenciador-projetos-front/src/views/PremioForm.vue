<template>
  <div>
    <h2 class="bg-primary">{{ id ? 'Editar Prêmio' : 'Novo Prêmio' }}</h2>
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="premio.nome" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Descrição</label>
        <textarea v-model="premio.descricao" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Ano</label>
        <input v-model.number="premio.ano" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Data inicial</label>
        <input v-model.number="premio.dataInicial" type="datetime" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">data final</label>
        <input v-model.number="premio.dataFinal" type="datetime" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <router-link class="btn btn-secondary" to="/premios">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      premio: { nome: '', descricao: '', ano: null },
      id: this.$route.params.id,
    };
  },
  async created() {
    if (this.id) {
      await this.carregarPremio();
    }
  },
  methods: {
    async carregarPremio() {
      try {
        const response = await axios.get(`http://localhost:3000/api/premios/${this.id}`);
        this.premio = response.data;
      } catch (error) {
        console.error('Erro ao carregar prêmio:', error);
      }
    },
    async salvar() {
      try {
        if (this.id) {
          await axios.put(`http://localhost:3000/api/premios/${this.id}`, this.premio);
        } else {
          await axios.post('http://localhost:3000/api/premios', this.premio);
        }
        this.$router.push('/premios');
      } catch (error) {
        console.error('Erro ao salvar prêmio:', error);
      }
    },
  },
};
</script>