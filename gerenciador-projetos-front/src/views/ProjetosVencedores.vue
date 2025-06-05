<template>
  <div class="bg-primary mb-4 p-4 rounded text-white">
    <h2>Projetos Vencedores</h2>
    <div v-if="!projetos || projetos.length === 0" class="alert alert-info">
      Nenhum projeto vencedor encontrado.
    </div>
    <table v-else class="table table-striped bg-white text-dark">
      <thead>
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Autor</th>
        <th>Prêmio</th>
        <th>Nota Média</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="projeto in projetos" :key="projeto.id">
        <td>{{ projeto.id || 'N/A' }}</td>
        <td>{{ projeto.titulo || 'N/A' }}</td>
        <td>{{ projeto.descricao || 'N/A' }}</td>
        <td>{{ projeto.autor && projeto.autor.nome ? projeto.autor.nome : 'N/A' }}</td>
        <td>{{ projeto.premio && projeto.premio.nome ? projeto.premio.nome : 'N/A' }}</td>
        <td>{{ projeto.notaMedia ? projeto.notaMedia.toFixed(2) : 'N/A' }}</td>
        <td>
          <router-link class="btn btn-sm btn-warning" :to="`/projetos/editar/${projeto.id}`">Editar</router-link>
          <button class="btn btn-sm btn-danger" @click="deletarProjeto(projeto.id)">Excluir</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>