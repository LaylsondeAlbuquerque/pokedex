// src/app/pages/pokemon-detail/pokemon-detail.ts
import { Component, OnInit, inject, signal } from '@angular/core';
// 1. Importe NgStyle para podermos usar [ngStyle] (estilos dinâmicos)
import { NgStyle } from '@angular/common'; 
// 2. Importe o RouterLink (para o botão "Voltar") e o ActivatedRoute (para ler a URL)
import { RouterLink, ActivatedRoute } from '@angular/router';
// 3. Importe 'forkJoin' (o operador para múltiplas chamadas)
import { forkJoin } from 'rxjs';

// 4. Importe o Serviço e TODAS as nossas interfaces de detalhes
import { Pokemon } from '../../services/pokemon';
import { PokemonDetail, PokemonColor } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [RouterLink, NgStyle], 
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})

// Component Class
export class PokemonDetailComponent implements OnInit {

  // Injects/Dependências
  private route = inject(ActivatedRoute);
  private pokemonService = inject(Pokemon);

  // Signals
  pokemon = signal<PokemonDetail | null>(null);
  colors = signal<PokemonColor | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.isLoading.set(true);

    // Capitura o nome do pokémon da URL
    const pokemonName = this.route.snapshot.paramMap.get('name');

    // Caso o pokémon não não seja encontrado
    if (!pokemonName) {
      this.error.set('Pokémon não encontrado na URL.');
      this.isLoading.set(false);
      return; 
    }

    // Observables
    const details$ = this.pokemonService.getPokemonDetails(pokemonName);
    const colors$ = this.pokemonService.getPokemonColors();

    // 11. Use 'forkJoin' para fazer os dois pedidos ao mesmo tempo
    //     'forkJoin' é como um "garçom" que espera que TODOS os pedidos
    //     estejam prontos antes de trazer qualquer coisa para a mesa.
    forkJoin({
      details: details$,   // O pedido de detalhes
      allColors: colors$   // O pedido de todas as cores
    })
    .subscribe({
      // 12. 'next' só é chamado quando AMBOS os pedidos terminam
      next: (result) => {
        // 'result' é um objeto: { details: PokemonDetail, allColors: PokemonColor[] }
        const { details, allColors } = result;

        // 13. Agora, encontre as cores para ESTE Pokémon
        const foundColors = allColors.find(c => c.name === details.name);

        // 14. Finalmente, atualize nossos Signals
        this.pokemon.set(details);
        if (foundColors) {
          this.colors.set(foundColors);
        }
        
        console.log('Detalhes:', details);
        console.log('Cores encontradas:', foundColors);

        this.isLoading.set(false); // Terminou de carregar
      },
      // 15. 'error' é chamado se QUALQUER UM dos pedidos falhar
      error: (err) => {
        console.error('Falha ao buscar dados combinados:', err);
        this.error.set('Falha ao carregar dados do Pokémon.');
        this.isLoading.set(false);
      }
    });
  }
}