// Imports
import { Component, OnInit, inject, signal, computed } from '@angular/core';
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
  // Injects/Dependências
  private pokemonService = inject(Pokemon);
  private isLoadingService = inject(LoadingService);

  // Signals
  pokemonList = signal<PokemonResult[]>([]);
  isLoading = this.isLoadingService.isLoading;
  searchTerm = signal<string>('');

  //  Pesquisa

  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase(); // Pega o termo da busca
    const list = this.pokemonList();             // Pega a lista completa

    // Se não há termo, retorna a lista completa
    if (!term) {
      return list;
    }

    // Se há termo, filtra a lista
    return list.filter(pokemon => 
      pokemon.name.toLowerCase().includes(term)
    );
  });

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
          }, 1000);
        },

        error: (err) => {
          console.error('Falha ao buscar dados:', err);
          this.isLoading.set(false);
        }

      });
      
  }

  // Metodos
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
