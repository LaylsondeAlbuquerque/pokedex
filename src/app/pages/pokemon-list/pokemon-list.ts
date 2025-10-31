// Imports
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Pokemon } from '../../services/pokemon';
import { PokemonResult } from '../../models/pokemon';
import { LoadingService } from '../../services/loading-service';

// Component Decorator
@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})

// Component Class
export class PokemonList {
  // Injects
  private pokemonService = inject(Pokemon);
  private isLoadingService = inject(LoadingService);

  // Signals
  pokemonList = signal<PokemonResult[]>([]);
  isLoading = this.isLoadingService.isLoading;

  // Lifecycle Hook
  ngOnInit() {
    console.log('Componente foi iniciado. Buscando Dados...');

    this.isLoading.set(true);

    this.pokemonService.getPokemonList()
      .subscribe({
        
        next: (dataApi) => {
          console.log('Dados recebidos da API:', dataApi);
          this.pokemonList.set(dataApi.results);
          setTimeout(() => {
            this.isLoading.set(false);
          }, 2000);
        },

        error: (err) => {
          console.error('Falha ao buscar dados:', err);
          this.isLoading.set(false);
        }

      });
      
  }
}
