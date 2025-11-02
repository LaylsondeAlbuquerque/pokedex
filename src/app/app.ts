/**
 * @file app.ts (app.component.ts)
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * O Componente Raiz (Root Component) da aplicação.
 * Este é o componente "pai" de todos os outros. Ele serve como o "casco"
 * principal (App Shell) que hospeda o <router-outlet> (onde as páginas
 * são carregadas) e o componente de loading global.
 */

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Usado para diretivas como NgIf, NgFor (embora @if/@for as substituam)
import { RouterOutlet } from '@angular/router'; // Necessário para <router-outlet>

// Importa nossos serviços e componentes customizados
import { LoadingService } from './services/loading-service';
import { Loading } from './pages/loading/loading'; // O componente <app-loading>

// ==========================================================================
// 2. DECORATOR DO COMPONENTE
// ==========================================================================
@Component({
  /**
   * O seletor que é usado no 'index.html' para carregar este componente.
   * (O 'index.html' contém <app-root></app-root>)
   */
  selector: 'app-root',
  standalone: true, // Indica que é um componente Standalone

  /**
   * As dependências que o template 'app.html' utiliza.
   * CommonModule: Fornece diretivas base (historicamente, *ngIf, *ngFor).
   * RouterOutlet: Fornece a diretiva <router-outlet>.
   * Loading: Fornece o componente <app-loading>.
   */
  imports: [CommonModule, RouterOutlet, Loading],
  templateUrl: './app.html', // O "molde" HTML deste componente
  styleUrl: './app.css' // Os estilos deste componente
})

// ==========================================================================
// 3. CLASSE DO COMPONENTE
// ==========================================================================
export class App {
  /**
   * @property {Signal<string>} title
   * @description Um signal que armazena o título da aplicação.
   * 'protected' permite que o template o acesse, 'readonly' que ele não seja alterado.
   */
  protected readonly title = signal('pokedex');

  /**
   * @property {LoadingService} loadingService
   * @description
   * Injeta a instância global do LoadingService na classe.
   * 'public' torna o 'loadingService' automaticamente acessível
   * para o template (app.html).
   */
  public loadingService = inject(LoadingService);
}