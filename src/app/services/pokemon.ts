import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { PokemonListResponse } from "../models/pokemon";

const API_URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {

  private http = inject(HttpClient);

  constructor() {}

  getPokemonList() {
    const url = `${API_URL}/pokemon?limit=151&offset=0`;
    return this.http.get<PokemonListResponse>(url);
  }

}
