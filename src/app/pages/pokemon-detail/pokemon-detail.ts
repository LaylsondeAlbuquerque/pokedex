/**
 * @file pokemon-detail.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * Lógica do Componente de Página de Detalhes (PokemonDetailComponent).
 * * Este componente é responsável por:
 * 1. Ler um parâmetro (o nome do Pokémon) da URL.
 * 2. Buscar dados de duas fontes diferentes usando o PokemonService:
 * - Detalhes do Pokémon (ID, nome, imagem) da PokéAPI externa.
 * - Cores do Pokémon (para estilização) do JSON local.
 * 3. Combinar essas duas fontes de dados usando `forkJoin`.
 * 4. Exibir os dados em Signals para o template.
 */

// ==========================================================================
// 1. IMPORTAÇÕES DE MÓDULOS E DEPENDÊNCIAS
// ==========================================================================
import { Component, OnInit, inject, signal } from '@angular/core';

// NgStyle é necessário para aplicar estilos CSS dinâmicos no template (ex: [ngStyle])
import { NgStyle } from '@angular/common'; 
// RouterLink para o link "Voltar", ActivatedRoute para ler a URL
import { RouterLink, ActivatedRoute } from '@angular/router';
// forkJoin do RxJS para executar múltiplos Observables em paralelo
import { forkJoin } from 'rxjs';

// Importa o Serviço (assumindo que 'Pokemon' é o 'PokemonService')
import { Pokemon } from '../../services/pokemon'; 
// Importa as interfaces (contratos de dados)
import { PokemonDetail, PokemonColor } from '../../models/pokemon'; 

// ==========================================================================
// 2. DECORATOR DO COMPONENTE
// ==========================================================================
@Component({
  selector: 'app-pokemon-detail', // Tag HTML: <app-pokemon-detail>
  standalone: true, // Indica que é um componente Standalone
  imports: [RouterLink, NgStyle], // Dependências que o template usa
  templateUrl: './pokemon-detail.html', // Caminho para o template HTML
  styleUrl: './pokemon-detail.css' // Caminho para os estilos
})

// ==========================================================================
// 3. CLASSE DO COMPONENTE
// ==========================================================================
export class PokemonDetailComponent implements OnInit {

  // --- 3.1. Injeção de Dependências ---
  // 'inject(ActivatedRoute)' obtém informações sobre a rota ativa (incluindo parâmetros da URL)
  private route = inject(ActivatedRoute); 
  // 'inject(Pokemon)' obtém a instância singleton do nosso serviço de dados
  private pokemonService = inject(Pokemon); 

  // --- 3.2. Gerenciamento de Estado (Signals) ---
  // Signal para armazenar os detalhes do Pokémon (ou nulo se ainda não carregado)
  pokemon = signal<PokemonDetail | null>(null);
  // Signal para armazenar as cores do Pokémon (ou nulo se não encontrado)
  colors = signal<PokemonColor | null>(null);
  // Signal para controlar a exibição do estado de "carregando"
  isLoading = signal<boolean>(true);
  // Signal para armazenar qualquer mensagem de erro
  error = signal<string | null>(null);

  /**
   * @function ngOnInit
   * @description
   * Método de ciclo de vida do Angular. É executado UMA VEZ
   * quando o componente é inicializado. Perfeito para buscar dados.
   */
  ngOnInit() {
    this.isLoading.set(true); // Inicia o carregamento

    // --- 3.3. Leitura do Parâmetro da Rota ---
    // 'snapshot' pega uma "foto" da rota no momento do carregamento
    // 'paramMap.get('name')' lê o parâmetro ':name' que definimos em app.routes.ts
    const pokemonName = this.route.snapshot.paramMap.get('name');

    // Validação: se nenhum nome for passado na URL, define um erro e para
    if (!pokemonName) {
      this.error.set('Pokémon não encontrado na URL.');
      this.isLoading.set(false);
      return; // Interrompe a execução do ngOnInit
    }

    // --- 3.4. Preparação dos Observables ---
    // Prepara o "cardápio" (Observable) para buscar os detalhes
    const details$ = this.pokemonService.getPokemonDetails(pokemonName);
    // Prepara o "cardápio" (Observable) para buscar o JSON de cores
    const colors$ = this.pokemonService.getPokemonColors();

    // --- 3.5. Execução em Paralelo com forkJoin ---
    // 'forkJoin' espera que AMBOS os observables (details$ e colors$)
    // sejam concluídos com sucesso antes de emitir um valor.
    forkJoin({
      details: details$,   // O resultado será 'result.details'
      allColors: colors$   // O resultado será 'result.allColors'
    })
    .subscribe({ // Faz o "pedido" (inicia as chamadas de API)
      
      /**
       * 'next' é chamado quando AMBOS os pedidos terminam com sucesso.
       * @param result - Um objeto { details: PokemonDetail, allColors: PokemonColor[] }
       */
      next: (result) => {
        // Desestruturação do objeto 'result' para variáveis locais
        const { details, allColors } = result;

        // Procura no array de cores local pelo Pokémon correspondente
        const foundColors = allColors.find(c => c.name === details.name);

        // Atualiza os signals com os dados encontrados
        this.pokemon.set(details);
        if (foundColors) {
          // Se encontrou as cores, armazena-as no signal 'colors'
          this.colors.set(foundColors);
        }
        
        // Logs de depuração
        console.log('Detalhes:', details);
        console.log('Cores encontradas:', foundColors);

        this.isLoading.set(false); // Para o carregamento
      },
      
      /**
       * 'error' é chamado se QUALQUER UM dos pedidos (details$ ou colors$) falhar.
       * @param err - O objeto de erro (HttpErrorResponse)
       */
      error: (err) => {
        console.error('Falha ao buscar dados combinados:', err);
        // Define a mensagem de erro personalizada para o usuário
        this.error.set('Falha ao carregar dados do Pokémon.');
        this.isLoading.set(false); // Para o carregamento, mesmo com erro
      }
    });
  }
}