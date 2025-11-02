/**
 * @file pokemon.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * Define todas as interfaces TypeScript (modelos de dados) para o projeto Pokédex.
 * Estas interfaces servem como "contratos" que garantem a tipagem correta
 * dos dados recebidos da PokéAPI externa e dos arquivos JSON locais.
 */


// ==========================================================================
// 1. INTERFACES DA API DE LISTA
// ==========================================================================

/**
 * @interface PokemonResult
 * @description Define a "forma" de um único Pokémon na resposta da API de lista.
 */
export interface PokemonResult {
    /** O nome do Pokémon (ex: "pikachu"). */
    name: string;
    /** A URL direta para a API de detalhes deste Pokémon. */
    url: string;
}

/**
 * @interface PokemonListResponse
 * @description Define a "forma" do objeto de resposta principal 
 * que a API de lista (/pokemon) retorna.
 */
export interface PokemonListResponse {
    /** O número total de Pokémon disponíveis no endpoint. */
    count: number;
    /** A URL para a próxima página de resultados, ou nulo se não houver. */
    next: string | null;
    /** A URL para a página anterior de resultados, ou nulo se não houver. */
    previous: string | null;
    /** Um array de Pokémon, onde cada objeto segue a interface PokemonResult. */
    results: PokemonResult[];
}


// ==========================================================================
// 2. INTERFACE DO JSON LOCAL (CORES)
// ==========================================================================

/**
 * @interface PokemonColor
 * @description Define a "forma" de um objeto de cor do nosso arquivo JSON
 * local (assets/cores-dos-pokemons.json).
 */
export interface PokemonColor {
  /** O nome do Pokémon (deve corresponder ao nome da API). */
  name: string;
  /** A cor primária (em código hexadecimal). */
  color1: string;
  /** A cor secundária (em código hexadecimal). */
  color2: string;
}


// ==========================================================================
// 3. INTERFACES DA API DE DETALHES
// ==========================================================================

/**
 * @interface PokemonSprites
 * @description Define a "forma" do objeto 'sprites' (imagens)
 * que vem aninhado dentro da resposta de detalhes da API.
 */
export interface PokemonSprites {
  /** A URL para a imagem PNG pixelada padrão (da frente). */
  front_default: string; 
}

/**
 * @interface PokemonDetail
 * @description Define a "forma" dos dados de detalhes de um único Pokémon
 * que a API de detalhes (/pokemon/{name}) retorna.
 */
export interface PokemonDetail {
  /** O número de ID oficial do Pokémon (ex: 25). */
  id: number;
  /** O nome do Pokémon. */
  name: string;
  /** A altura do Pokémon (em decímetros). */
  height: number;
  /** O peso do Pokémon (em hectogramas). */
  weight: number;
  /** O objeto aninhado que contém as URLs das imagens. */
  sprites: PokemonSprites;
}