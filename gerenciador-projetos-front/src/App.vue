<template class="app-container">
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-body-secondary mb-4">
      <a class="navbar-brand mr-sm-2" href="#">Gerenciador de Projetos</a>
      <div class="navbar-nav">
        <router-link class="nav-link" to="/premios">Prêmios</router-link>
        <router-link class="nav-link" to="/autores">Autores</router-link>
        <router-link class="nav-link" to="/avaliadores">Avaliadores</router-link>
        <router-link class="nav-link" to="/projetos">Projetos</router-link>
        <router-link class="nav-link" to="/avaliacoes">Avaliações</router-link>

        <!-- Dropdown Consultas -->
        <div class="nav-item dropdown">
          <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarConsultas"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
            Consultas
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarConsultas">
            <li>
              <router-link class="dropdown-item" to="/consultas/projetos-com-autores">Projetos com autores</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/consultas/autores-com-projetos">Autores com projetos</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/consultas/projetos-nao-avaliados">Projetos não avaliados</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/consultas/projetos-avaliados">Projetos avaliados</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/consultas/projetos-vencedores">Projetos vencedores</router-link>
            </li>
          </ul>
        </div>
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