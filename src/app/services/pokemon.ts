import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { 
  PokemonListResponse,
  PokemonDetail,
  PokemonColor
 } from "../models/pokemon";

const API_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {

  private http = inject(HttpClient);

  constructor() {}

  // Busca a lista de pokémons
  getPokemonList() {
    const url = `${API_URL}/pokemon?limit=151&offset=0`;
    return this.http.get<PokemonListResponse>(url);
  }

  //  Busca os detalhes de um pokémon
  getPokemonDetails(name: string) {
    const url = `${API_URL}/pokemon/${name}`;
    return this.http.get<PokemonDetail>(url);
  }

  // Busca as cores dos pokémons
  getPokemonColors() {
    const url = `assets/cores-dos-pokemons.json`;
    return this.http.get<PokemonColor[]>(url)
  }

}
