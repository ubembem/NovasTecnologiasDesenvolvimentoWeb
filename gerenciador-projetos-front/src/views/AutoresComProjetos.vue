<template>
  <div class="bg-light p-4 rounded">
    <h2 class="text-primary mb-4">Autores com seus Projetos</h2>

    <div v-if="autores.length === 0" class="alert alert-info">
      Nenhum autor encontrado.
    </div>

    <div v-else class="table-responsive">
      <div v-for="autor in autores" :key="autor.id" class="mb-4 p-3 rounded shadow-sm border">
        <h4 class="text-dark">{{ autor.nome }} (ID: {{ autor.id }})</h4>
        <p class="text-muted">Email: {{ autor.email }}</p>
        <p class="text-muted">Criado em: {{ formatarData(autor.createdAt) }}</p>

        <h5 class="mt-3">Projetos:</h5>
        <table v-if="autor.projetos.length > 0" class="table table-striped table-bordered bg-white">
          <thead class="table-primary">
          <tr>
            <th>Projeto ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Prêmio</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="projeto in autor.projetos" :key="projeto.id">
            <td>{{ projeto.id }}</td>
            <td>{{ projeto.titulo }}</td>
            <td>{{ projeto.descricao }}</td>
            <td>{{ projeto.premio ? projeto.premio.nome : 'N/A' }}</td>
          </tr>
          </tbody>
        </table>
        <p v-else class="text-muted">Nenhum projeto associado.</p>
      </div>
    </div>
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
    try {
      const response = await axios.get('http://localhost:3000/api/consultas/listarAutoresComProjetos');
      console.log('Dados recebidos:', response.data);
      this.autores = response.data;
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    }
  },
  methods: {
    formatarData(isoDate) {
      if (!isoDate) return '';
      const data = new Date(isoDate);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
  },
};
</script>

<style scoped>
.bg-light {
  background-color: #f9f9f9 !important;
}
.shadow-sm {
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: rgba(0,123,255,.05);
}
.table-primary {
  background-color: #007bff !important;
  color: white !important;
}
</style>
