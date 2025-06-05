import { createRouter, createWebHistory } from 'vue-router';
import PremioList from '../views/PremioList.vue';
import AutorList from '../views/AutorList.vue';
import AvaliadorList from '../views/AvaliadorList.vue';
import ProjetoList from '../views/ProjetoList.vue';
import AvaliacaoList from '../views/AvaliacaoList.vue';
import PremioForm from '../views/PremioForm.vue';
import AutorForm from '../views/AutorForm.vue';
import AvaliadorForm from '../views/AvaliadorForm.vue';
import ProjetoForm from '../views/ProjetoForm.vue';
import AvaliacaoForm from '../views/AvaliacaoForm.vue';
import ProjetosComAutores from '../views/ProjetosComAutores.vue';
import AutoresComProjetos from '../views/AutoresComProjetos.vue';
import ProjetosNaoAvaliados from '../views/ProjetosNaoAvaliados.vue';
import ProjetosAvaliados from '../views/ProjetosAvaliados.vue';
import ProjetosVencedores from '../views/ProjetosVencedores.vue';

const routes = [
    { path: '/', redirect: '/premios' },
    { path: '/premios', component: PremioList },
    { path: '/autores', component: AutorList },
    { path: '/avaliadores', component: AvaliadorList },
    { path: '/projetos', component: ProjetoList },
    { path: '/avaliacoes', component: AvaliacaoList },
    { path: '/premios/novo', component: PremioForm },
    { path: '/premios/editar/:id', component: PremioForm },
    { path: '/autores/novo', component: AutorForm },
    { path: '/autores/editar/:id', component: AutorForm },
    { path: '/avaliadores/novo', component: AvaliadorForm },
    { path: '/avaliadores/editar/:id', component: AvaliadorForm },
    { path: '/projetos/novo', component: ProjetoForm },
    { path: '/projetos/editar/:id', component: ProjetoForm },
    { path: '/avaliacoes/novo', component: AvaliacaoForm },
    { path: '/avaliacoes/editar/:id', component: AvaliacaoForm },
    { path: '/consultas/projetos-com-autores', component: ProjetosComAutores },
    { path: '/consultas/autores-com-projetos', component: AutoresComProjetos },
    { path: '/consultas/projetos-nao-avaliados', component: ProjetosNaoAvaliados },
    { path: '/consultas/projetos-avaliados', component: ProjetosAvaliados },
    { path: '/consultas/projetos-vencedores', component: ProjetosVencedores },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;