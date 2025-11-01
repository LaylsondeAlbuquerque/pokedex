import { Routes } from '@angular/router';

import { PokemonList } from './pages/pokemon-list/pokemon-list';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: PokemonList
    },
    {
        path: 'detail/:name',
        component: PokemonDetailComponent
    }
];
