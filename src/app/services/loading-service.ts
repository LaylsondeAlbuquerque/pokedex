/**
 * @file loading-service.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * Este serviço gerencia um estado de carregamento global para a aplicação.
 * * Ele fornece um único Signal 'isLoading' que pode ser injetado e
 * compartilhado por qualquer componente. Um componente (como o 'pokemon-list')
 * pode definir o 'isLoading' para 'true' ao buscar dados, e outro
 * componente (como o 'app') pode ler esse 'isLoading' para
 * decidir se deve exibir ou não o componente <app-loading>.
 */

import { Injectable, signal } from '@angular/core';

/**
 * @Injectable
 * @description
 * Marca a classe como um serviço que pode ser injetado.
 * 'providedIn: 'root'' transforma este serviço em um "singleton" global,
 * o que significa que existe apenas UMA instância dele em toda a aplicação,
 * permitindo que o estado de 'isLoading' seja compartilhado.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  /**
   * @property {Signal<boolean>} isLoading
   * @description
   * O Signal que armazena o estado de carregamento (true = carregando, false = ocioso).
   * Inicia como 'true' para garantir que a tela de loading seja
   * exibida assim que o aplicativo é carregado, antes do ngOnInit
   * da página de lista ser acionado.
   */
  isLoading = signal<boolean>(true);
}