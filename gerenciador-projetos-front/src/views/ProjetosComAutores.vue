<template>
  <div class="bg-light p-4 rounded">
    <h2 class="text-primary mb-4">Projetos com seus Autores</h2>

    <div v-if="projetos.length === 0" class="alert alert-info">
      Nenhum projeto encontrado.
    </div>

    <div v-else class="table-responsive">
      <div v-for="projeto in projetos" :key="projeto.id" class="mb-4 p-3 rounded shadow-sm border">
        <h4 class="text-dark">{{ projeto.titulo }} (ID: {{ projeto.id }})</h4>
        <p class="text-muted">{{ projeto.descricao }}</p>
        <p><strong>Prêmio:</strong> {{ projeto.premio ? projeto.premio.nome : 'N/A' }}</p>

        <h5 class="mt-3">Autores:</h5>
        <table v-if="projeto.autores.length > 0" class="table table-striped table-bordered bg-white">
          <thead class="table-primary">
          <tr>
            <th>Autor ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Criado Em</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="autor in projeto.autores" :key="autor.id">
            <td>{{ autor.id }}</td>
            <td>{{ autor.nome }}</td>
            <td>{{ autor.email }}</td>
            <td>{{ formatarData(autor.createdAt) }}</td>
          </tr>
          </tbody>
        </table>
        <p v-else class="text-muted">Nenhum autor associado.</p>
      </div>
    </div>
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
    try {
      const response = await axios.get('http://localhost:3000/api/consultas/listarProjetosComAutores');
      console.log('Dados recebidos:', response.data);
      this.projetos = response.data;
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
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
