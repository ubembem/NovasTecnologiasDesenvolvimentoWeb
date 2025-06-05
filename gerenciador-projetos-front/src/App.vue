<template class="app-container">
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-body-secondary mb-4" >
      <a class="navbar-brand mr-sm-2" href="#">Gerenciador de Projetos</a>
      <div class="nav">
        <router-link class="nav-link" to="/premios">Prêmios</router-link>
        <router-link class="nav-link" to="/autores">Autores</router-link>
        <router-link class="nav-link" to="/avaliadores">Avaliadores</router-link>
        <router-link class="nav-link" to="/projetos">Projetos</router-link>
        <router-link class="nav-link" to="/avaliacoes">Avaliações</router-link>
        <router-link class="nav-link" to="/consultas/projetos-com-autores">Consultas projetos com autores</router-link>
        <router-link class="nav-link" to="/consultas/autores-com-projetos">Autores com projetos</router-link>
        <router-link class="nav-link" to="/consultas/projetos-nao-avaliados">Projetos não avaliados</router-link>
        <router-link class="nav-link" to="/consultas/projetos-avaliados">Projetos avaliados</router-link>
        <router-link class="nav-link" to="/consultas/projetos-vencedores">Projetos vencedores</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>