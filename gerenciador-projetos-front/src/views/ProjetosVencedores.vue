<template>
  <div class="table-responsive">
    <h2>Projetos Vencedores</h2>
    <div v-if="!projetos || projetos.length === 0" class="alert alert-info">
      Nenhum projeto vencedor encontrado.
    </div>
    <table v-else class="table table-striped bg-white text-dark">
      <thead class="table-dark">
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Autores</th>
        <th>Prêmio</th>
        <th>Nota Média</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id }}</td>
        <td>{{ projeto.titulo }}</td>
        <td>{{ projeto.descricao }}</td>
        <td>
            <span v-for="autor in projeto.autores" :key="autor.id">
              {{ autor.nome }}<span v-if="!isLastAutor(projeto.autores, autor)">, </span>
            </span>
        </td>
        <td>{{ projeto.premio ? projeto.premio.nome : 'N/A' }}</td>
        <td>{{ projeto.notaMedia.toFixed(2) }}</td>
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
      const res = await axios.get('http://localhost:3000/api/consultas/listarProjetosVencedores');
      this.projetos = res.data;
    } catch (err) {
      console.error('Erro ao carregar projetos vencedores:', err);
    }
  },
  methods: {
    isLastAutor(array, autor) {
      return array[array.length - 1].id === autor.id;
    },
  },
};
</script>
