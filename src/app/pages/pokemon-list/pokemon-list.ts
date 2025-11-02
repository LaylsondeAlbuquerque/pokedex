/**
 * @file pokemon-list.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * Lógica do Componente de Página de Lista (PokemonListComponent).
 * Este componente é responsável por:
 * 1. Buscar a lista inicial de Pokémon do serviço.
 * 2. Gerenciar o estado de carregamento (usando um serviço global).
 * 3. Filtrar a lista com base na busca do usuário usando um signal 'computed'.
 */

// ==========================================================================
// 1. IMPORTAÇÕES
// ==========================================================================
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router'; // Necessário para o [routerLink] no template

import { Pokemon } from '../../services/pokemon'; // O Serviço de dados
import { PokemonResult } from '../../models/pokemon'; // A Interface (contrato)
import { LoadingService } from '../../services/loading-service'; // O Serviço de Loading global

// ==========================================================================
// 2. DECORATOR DO COMPONENTE
// ==========================================================================
@Component({
  selector: 'app-pokemon-list', // Tag HTML: <app-pokemon-list>
  standalone: true, // Componente Standalone
  imports: [RouterLink], // Dependências que o template usa
  templateUrl: './pokemon-list.html', // Caminho para o template
  styleUrl: './pokemon-list.css', // Caminho para os estilos
})

// ==========================================================================
// 3. CLASSE DO COMPONENTE
// ==========================================================================
export class PokemonList implements OnInit {
  
  // --- 3.1. Injeção de Dependências ---
  private pokemonService = inject(Pokemon); // Injeta o serviço de dados
  private isLoadingService = inject(LoadingService); // Injeta o serviço de loading

  // --- 3.2. Gerenciamento de Estado (Signals) ---
  
  /** Signal que armazena a lista *completa* e *bruta* de Pokémon vinda da API. */
  pokemonList = signal<PokemonResult[]>([]);
  
  /** Signal que controla o estado de carregamento. Ele é *referenciado* do serviço global. */
  isLoading = this.isLoadingService.isLoading;
  
  /** Signal que armazena o texto atual digitado na barra de busca. */
  searchTerm = signal<string>('');

  // --- 3.3. Signal Computado (Filtro de Busca) ---
  
  /**
   * @function filteredList
   * @description Um signal 'computed' (computado) que reage a mudanças.
   * Ele "escuta" os signals 'searchTerm' e 'pokemonList'.
   * Se qualquer um deles mudar, ele re-executa essa lógica e 
   * atualiza seu próprio valor (a lista filtrada), que é o que o 
   * template (@for) está lendo.
   */
  filteredList = computed(() => {
    const term = this.searchTerm().toLowerCase(); // Pega o termo da busca
    const list = this.pokemonList();             // Pega a lista completa

    // Se o termo da busca estiver vazio, retorna a lista completa
    if (!term) {
      return list;
    }

    // Se houver um termo, filtra a lista e retorna apenas os
    // Pokémon cujo nome inclui o termo da busca.
    return list.filter(pokemon => 
      pokemon.name.toLowerCase().includes(term)
    );
  });

  // --- 3.4. Ciclo de Vida (ngOnInit) ---
  
  /**
   * @function ngOnInit
   * @description Método de ciclo de vida, executado na inicialização do componente.
   */
  ngOnInit() {
    console.log('Componente foi iniciado. Buscando Dados...');
    this.isLoading.set(true); // Ativa a tela de loading global

    // Chama o método do serviço, que retorna um Observable
    this.pokemonService.getPokemonList()
      .subscribe({ // Assina o Observable para receber os dados
        
        /** Callback de Sucesso: executado quando os dados chegam. */
        next: (dataApi) => {
          console.log('Dados recebidos da API:', dataApi);
          // Armazena a lista bruta no signal
          this.pokemonList.set(dataApi.results);
          
          // Adiciona um atraso de 1 segundo (1000ms) ANTES de esconder o loading.
          // Isso garante que a animação de loading seja exibida por
          // pelo menos 1 segundo, evitando um "flash" rápido.
          setTimeout(() => {
            this.isLoading.set(false);
          }, 1000);
        },

        /** Callback de Erro: executado se a chamada de API falhar. */
        error: (err) => {
          console.error('Falha ao buscar dados:', err);
          this.isLoading.set(false); // Garante que o loading seja desativado em caso de erro
        }

      });
  }

  // --- 3.5. Métodos ---
  
  /**
   * @function onSearch
   * @description Método chamado pelo evento (input) da barra de busca.
   * @param event - O objeto de evento DOM padrão.
   */
  onSearch(event: Event) {
    // Extrai o valor do texto do elemento <input>
    const value = (event.target as HTMLInputElement).value;
    // Atualiza o signal 'searchTerm', o que
    // aciona automaticamente o recálculo do signal 'filteredList'.
    this.searchTerm.set(value);
  }
}