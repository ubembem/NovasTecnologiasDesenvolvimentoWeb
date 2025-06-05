<template>
  <div class="bg-primary mb-4 p-4 rounded text-white">
    <h2>Projetos Avaliados</h2>
    <div v-if="projetos.length === 0" class="alert alert-info">
      Nenhum projeto avaliado encontrado.
    </div>
    <table v-else class="table table-striped bg-white text-dark">
      <thead>
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Autor</th>
        <th>Prêmio</th>
        <th>Notas</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.titulo }}</td>
        <td>{{ projeto.descricao }}</td>
        <td>{{ projeto.autor ? projeto.autor.nome : 'N/A' }}</td>
        <td>{{ projeto.premio ? projeto.premio.nome : 'N/A' }}</td>
        <td>
            <span v-for="avaliacao in projeto.avaliacoes" :key="avaliacao.id">
              {{ avaliacao.nota }} ({{ avaliacao.avaliador ? avaliacao.avaliador.nome : 'N/A' }})<br />
            </span>
        </td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/projetos/editar/${projeto.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarProjeto(projeto.id)">Excluir</button>
        </td>
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
    await this.carregarProjetos();
  },
  methods: {
    async carregarProjetos() {
      try {
        const response = await axios.get('http://localhost:3000/api/consultas/projetos-avaliados');
        console.log('Dados recebidos:', response.data);
        this.projetos = response.data;
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      }
    },
    async deletarProjeto(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/projetos/${id}`);
          await this.carregarProjetos();
        } catch (error) {
          console.error('Erro ao excluir projeto:', error);
        }
      }
    },
  },
};
</script>