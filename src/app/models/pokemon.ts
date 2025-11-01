export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}

export interface PokemonColor {
  name: string;
  color1: string;
  color2: string;
}

export interface PokemonSprites {
  front_default: string; 
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
}