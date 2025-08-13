<template>
  <div class="table-responsive">
    <h2>Lista de Autores</h2>
    <router-link class="btn btn-primary mb-4" to="/autores/novo">Novo Autor</router-link>

    <div class="table table-striped">
      <table class="table table-striped table-bordered table-hover w-100">
        <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th style="width: 150px;">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="autor in autores" :key="autor.id">
          <td>{{ autor.id }}</td>
          <td>{{ autor.nome }}</td>
          <td>{{ autor.email }}</td>
          <td>{{ autor.cpf || 'Não informado' }}</td>
          <td>{{ autor.telefone || 'Não informado' }}</td>
          <td>
            <router-link :to="`/autores/editar/${autor.id}`" class="btn btn-warning btn-sm me-2">Editar</router-link>
            <button @click="deletarAutor(autor.id)" class="btn btn-danger btn-sm">Excluir</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<!--<template>-->
<!--  <div class="container my-4">-->
<!--    <h2 class="mb-4">Lista de Autores</h2>-->

<!--    <router-link class="btn btn-primary mb-4" to="/autores/novo">-->
<!--      Novo Autor-->
<!--    </router-link>-->

<!--    <div class="table-responsive">-->
<!--      <table class="table table-striped table-bordered table-hover w-100">-->
<!--        <thead class="table-dark">-->
<!--        <tr>-->
<!--          <th>ID</th>-->
<!--          <th>Nome</th>-->
<!--          <th>Email</th>-->
<!--          <th>CPF</th>-->
<!--          <th>Telefone</th>-->
<!--          <th style="width: 150px;">Ações</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr v-for="autor in autores" :key="autor.id">-->
<!--          <td>{{ autor.id }}</td>-->
<!--          <td>{{ autor.nome }}</td>-->
<!--          <td>{{ autor.email }}</td>-->
<!--          <td>{{ autor.cpf || 'Não informado' }}</td>-->
<!--          <td>{{ autor.telefone || 'Não informado' }}</td>-->
<!--          <td>-->
<!--            <router-link-->
<!--                :to="`/autores/editar/${autor.id}`"-->
<!--                class="btn btn-warning btn-sm me-2"-->
<!--            >-->
<!--              Editar-->
<!--            </router-link>-->
<!--            <button-->
<!--                @click="deletarAutor(autor.id)"-->
<!--                class="btn btn-danger btn-sm"-->
<!--            >-->
<!--              Excluir-->
<!--            </button>-->
<!--          </td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<script>
import axios from 'axios';

export default {
  data() {
    return {
      autores: [],
    };
  },
  async created() {
    await this.carregarAutores();
  },
  methods: {
    async carregarAutores() {
      try {
        const response = await axios.get('http://localhost:3000/api/autores');
        this.autores = response.data;
      } catch (error) {
        console.error('Erro ao carregar autores:', error);
      }
    },
    async deletarAutor(id) {
      if (confirm('Confirmar exclusão?')) {
        try {
          await axios.delete(`http://localhost:3000/api/autores/${id}`);
          this.carregarAutores();
        } catch (error) {
          console.error('Erro ao excluir autores:', error);
        }
      }
    },
  },
};
</script>