<h1 align="center">Pokédex com Angular</h1>

<p align="center">
  <a href="https://laylsondealbuquerque.github.io/pokedex/list">
    <img src="https://img.shields.io/badge/Ver_Pokédex_Online!-FF0000?style=for-the-badge&logo=angular&logoColor=white" alt="Ver Pokédex Online" />
  </a>
</p>

---

## Sobre o Projeto

Este é um projeto de estudo focado em **Angular (v17+)**, onde pude construir uma Single Page Application (SPA) completa. A aplicação consome a API pública [PokéAPI](https://pokeapi.co/) para buscar dados reais de Pokémon e os combina com um arquivo JSON local (criado por mim) para a estilização dinâmica.

O desenvolvimento foi uma jornada de aprendizado intensiva sobre os conceitos mais modernos de front-end, desde o consumo de APIs e roteamento até o gerenciamento de estado reativo com **Signals**, que é a nova base do Angular.

---

## Funcionalidades

- [x] Listagem dos 151 Pokémon da primeira geração.
- [x] Tela de loading ("Pokébola") personalizada com animação em CSS.
- [x] Sistema de busca (filtro) em tempo real na lista de Pokémon.
- [x] Roteamento para uma página de detalhes de cada Pokémon (SPA).
- [x] Página de detalhes com informações da API (altura, peso, imagem).
- [x] **Estilização Dinâmica:** O card de detalhes e o botão "Voltar" mudam de cor com base nas cores do Pokémon.
- [x] Publicação do site (deploy) via GitHub Pages.

---

## Tecnologias Utilizadas

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## O que eu aprendi

Este projeto foi fundamental para solidificar conceitos modernos de desenvolvimento com Angular:

* **Arquitetura de Componentes:** Separação de responsabilidades (Páginas "Smart" vs. Componentes "Dumb", como o `app-loading`).
* **Serviços e Injeção de Dependência:** Uso da função `inject()` para desacoplar a lógica de busca de dados (consumo de API) dos componentes.
* **Consumo de API com `HttpClient`:** Requisições `GET` para uma API externa (PokéAPI) e também para um arquivo `JSON` local (na pasta `assets`).
* **Programação Reativa (RxJS):** Uso de `Observable`, `.subscribe()` e, principalmente, `forkJoin` para gerenciar e combinar múltiplas chamadas assíncronas (buscar detalhes e cores ao mesmo tempo).
* **Gerenciamento de Estado com Signals:** Utilização de `signal()` para o estado (lista, loading, erro), `computed()` para criar o filtro de busca reativo, e `.set()`/`.update()` para alterar o estado.
* **Nova Sintaxe de Template:** Uso dos blocos de controle `@for` (com `track` e `@empty`) e `@if`.
* **Roteamento (SPA):** Configuração de `app.routes.ts`, navegação sem recarregar a página com `RouterLink` e leitura de parâmetros da URL (como `:name`) com `ActivatedRoute`.
* **Estilização Dinâmica:** Uso da diretiva `[ngStyle]` para alterar o CSS de um componente dinamicamente com base nos dados recebidos (as cores do Pokémon).
* **Deploy:** Publicação de um projeto Angular no GitHub Pages usando o pacote `angular-cli-ghpages`, configurando o `base-href` e ajustando o `angular.json`.

---

## Como Executar Localmente

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/laylsondealbuquerque/pokedex.git](https://github.com/laylsondealbuquerque/pokedex.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd pokedex
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Execute o servidor de desenvolvimento:
    ```bash
    ng serve
    ```
5.  Abra seu navegador em `http://localhost:4200/`.
