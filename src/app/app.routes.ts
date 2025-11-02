/**
 * @file app.routes.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * O "mapa" de rotas da aplicação.
 * Este arquivo define qual componente deve ser carregado
 * para cada caminho (URL) que o usuário visitar.
 */

import { Routes } from '@angular/router';

// Importa os componentes que servirão como "páginas"
import { PokemonList } from './pages/pokemon-list/pokemon-list';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail';

/**
 * @const routes
 * @description
 * Um array de objetos de Rota. O Roteador do Angular
 * lê este array de cima para baixo para encontrar a primeira correspondência.
 */
export const routes: Routes = [
    /**
     * Rota de Redirecionamento (Página Padrão).
     * 'path: ''' (caminho vazio) - Corresponde à raiz do site (ex: localhost:4200/).
     * 'redirectTo: '/list'' - Redireciona o usuário para o caminho '/list'.
     * 'pathMatch: 'full'' - Exige que o caminho seja *exatamente* vazio (não um prefixo).
     */
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    /**
     * Rota da Página de Lista.
     * 'path: 'list'' - Corresponde à URL (ex: localhost:4200/list).
     * 'component: PokemonList' - Renderiza o PokemonList dentro do <router-outlet>.
     */
    {
        path: 'list',
        component: PokemonList
    },
    /**
     * Rota da Página de Detalhes (com Parâmetro Dinâmico).
     * 'path: 'detail/:name'' - Corresponde à URL (ex: localhost:4200/detail/pikachu).
     * ':name' - É um "parâmetro de rota" dinâmico. O Roteador captura
     * o valor ('pikachu') e o disponibiliza para o PokemonDetailComponent.
     */
    {
        path: 'detail/:name',
        component: PokemonDetailComponent
    }
];