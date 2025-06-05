<template>
  <div class="bg-primary mb-3">
    <h2>Projetos com Autores</h2>
    <div v-if="projetos.length === 0" class="alert alert-info">
      Nenhum projeto encontrado.
    </div>
    <table v-else class="table table-striped">
      <thead>
      <tr>
        <th>Projeto ID</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Autor ID</th>
        <th>Autor Nome</th>
        <th>Autor Email</th>
        <th>Autor Criado Em</th>
        <th>Prêmio</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.titulo }}</td>
        <td>{{ projeto.descricao }}</td>
        <td>{{ projeto.autor ? projeto.autor.id : 'N/A' }}</td>
        <td>{{ projeto.autor ? projeto.autor.nome : 'N/A' }}</td>
        <td>{{ projeto.autor ? projeto.autor.email : 'N/A' }}</td>
        <td>{{ projeto.autor ? new Date(projeto.autor.createdAt).toLocaleDateString() : 'N/A' }}</td>
        <td>{{ projeto.premio ? projeto.premio.nome : 'N/A' }}</td>
      </tr>
      </tbody>
    </table>
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
      const response = await axios.get('http://localhost:3000/api/consultas/projetos-com-autores');
      console.log('Dados recebidos:', response.data);
      this.projetos = response.data;
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  },
};
</script>