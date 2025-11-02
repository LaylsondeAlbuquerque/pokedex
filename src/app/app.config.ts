/**
 * @file app.config.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * Arquivo de configuração principal para uma aplicação Angular standalone.
 * Este arquivo substitui o antigo 'AppModule' (app.module.ts).
 * É aqui que registramos ("fornecemos") os serviços e
 * funcionalidades globais da aplicação, como o Roteador e o HttpClient.
 */

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// Importa a função para "fornecer" o roteador
import { provideRouter } from '@angular/router';

// Importa o nosso "mapa de rotas" definido em app.routes.ts
import { routes } from './app.routes';
// Importa a função para "fornecer" o HttpClient
import { provideHttpClient } from '@angular/common/http';

/**
 * @const appConfig
 * @description
 * O objeto de configuração que o Angular usa para inicializar a aplicação.
 */
export const appConfig: ApplicationConfig = {
  /**
   * 'providers' é um array que "injeta" serviços e funcionalidades
   * no nível raiz (global) da aplicação.
   */
  providers: [
    // Provedores padrão do Angular para detecção de mudança e erros
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Ativa o Roteador do Angular em toda a aplicação,
     * passando o nosso "mapa" de rotas (o array 'routes').
     */
    provideRouter(routes),

    /**
     * Registra o serviço 'HttpClient' globalmente.
     * Isso nos permite 'injetar' e usar o HttpClient em qualquer
     * serviço (como o PokemonService) para fazer chamadas de API.
     */
    provideHttpClient(),
  ]
};