/**
 * @file pokemon.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * O "Data Service" (Serviço de Dados) principal da aplicação.
 * Esta classe é responsável por toda a comunicação HTTP. Ela busca
 * dados da PokéAPI externa e também do arquivo JSON local (cores).
 * * Ela encapsula a lógica de "onde" e "como" buscar os dados,
 * deixando os componentes responsáveis apenas por "quando" pedir.
 */

// ==========================================================================
// 1. IMPORTAÇÕES
// ==========================================================================
import { Injectable, inject } from '@angular/core';
// O 'HttpClient' é o módulo do Angular para fazer requisições HTTP (GET, POST, etc.)
import { HttpClient } from '@angular/common/http';

// Importa as "interfaces" (contratos de dados) do arquivo de modelos
import { 
  PokemonListResponse,
  PokemonDetail,
  PokemonColor
 } from "../models/pokemon";

// ==========================================================================
// 2. CONSTANTES
// ==========================================================================

/**
 * @const API_URL
 * @description A URL base (o "prédio") da PokéAPI.
 * Armazenada como uma constante para fácil manutenção e reutilização.
 */
const API_URL = 'https://pokeapi.co/api/v2';

// ==========================================================================
// 3. DECORATOR DO SERVIÇO
// ==========================================================================
@Injectable({
  /**
   * 'providedIn: 'root'' faz deste um serviço "singleton" global,
   * disponível para injeção em qualquer componente da aplicação.
   */
  providedIn: 'root',
})

// ==========================================================================
// 4. CLASSE DO SERVIÇO
// ==========================================================================

/**
 * @class Pokemon
 * @description A classe de serviço que será injetada nos componentes.
 */
export class Pokemon {

  /**
   * @property {HttpClient} http
   * @description
   * Injeta (usando a função 'inject') a instância singleton do HttpClient.
   * Este 'http' é o objeto que usaremos para fazer as chamadas .get().
   */
  private http = inject(HttpClient);

  constructor() {}

  // --- 4.1. Métodos de Busca (API Externa) ---

  /**
   * @function getPokemonList
   * @description Busca a lista dos primeiros 151 Pokémon.
   * @returns {Observable<PokemonListResponse>} Um "cardápio" (Observable) que
   * promete entregar um objeto com a forma da interface 'PokemonListResponse'.
   */
  getPokemonList() {
    // Concatena a URL base com o endpoint e os parâmetros de busca
    const url = `${API_URL}/pokemon?limit=151&offset=0`;
    // Retorna o Observable (o pedido "preguiçoso")
    return this.http.get<PokemonListResponse>(url);
  }

  /**
   * @function getPokemonDetails
   * @description Busca os detalhes de um único Pokémon pelo nome.
   * @param {string} name - O nome do Pokémon a ser buscado (ex: "pikachu").
   * @returns {Observable<PokemonDetail>} Um Observable que promete
   * entregar um objeto com a forma da interface 'PokemonDetail'.
   */
  getPokemonDetails(name: string) {
    // Concatena a URL base com o endpoint e o nome dinâmico
    const url = `${API_URL}/pokemon/${name}`;
    return this.http.get<PokemonDetail>(url);
  }

  // --- 4.2. Método de Busca (JSON Local) ---

  /**
   * @function getPokemonColors
   * @description Busca o nosso arquivo JSON local de cores.
   * O 'HttpClient' trata 'assets/...' como uma URL para o servidor
   * local (localhost:4200/assets/...).
   * @returns {Observable<PokemonColor[]>} Um Observable que promete
   * entregar um *array* de objetos 'PokemonColor'.
   */
  getPokemonColors() {
    const url = `assets/cores-dos-pokemons.json`;
    return this.http.get<PokemonColor[]>(url)
  }

}