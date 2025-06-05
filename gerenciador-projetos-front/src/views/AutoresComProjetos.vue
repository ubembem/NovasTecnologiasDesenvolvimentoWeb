<template>
  <div class="bg-secondary mb-3 p-4 rounded text-white">
    <h2>Autores com seus Projetos</h2>
    <div v-if="autores.length === 0" class="alert alert-info">
      Nenhum autor encontrado.
    </div>
    <div v-else>
      <div v-for="autor in autores" :key="autor.id" class="mb-4">
        <h4>{{ autor.nome }} (ID: {{ autor.id }})</h4>
        <p>Email: {{ autor.email }}</p>
        <p>Criado em: {{ new Date(autor.createdAt).toLocaleDateString() }}</p>
        <h5>Projetos:</h5>
        <table v-if="autor.projetos.length > 0" class="table table-striped bg-white text-dark">
          <thead>
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
            <td>{{ projeto.premioId ? `Prêmio ID: ${projeto.premioId}` : 'N/A' }}</td>
          </tr>
          </tbody>
        </table>
        <p v-else>Nenhum projeto associado.</p>
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
      const response = await axios.get('http://localhost:3000/api/consultas/autores-com-projetos');
      console.log('Dados recebidos:', response.data);
      this.autores = response.data;
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    }
  },
};
</script>