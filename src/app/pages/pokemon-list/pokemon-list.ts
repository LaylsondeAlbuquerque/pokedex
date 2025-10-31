import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Pokemon } from '../../services/pokemon';
import { PokemonResult } from '../../models/pokemon';


@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  private pokemonService = inject(Pokemon)

  pokemonList = signal<PokemonResult[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    console.log('Componente foi iniciado. Buscando Dados...');

    this.pokemonService.getPokemonList()
      .subscribe({
        
        next: (dataApi) => {
          console.log('Dados recebidos da API:', dataApi);
          this.pokemonList.set(dataApi.results);
          this.isLoading.set(false);
        },

        error: (err) => {
          console.error('Falha ao buscar dados:', err);
          this.isLoading.set(false);
        }

      });
      
  }
}
