import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { LoadingService } from './services/loading-service';
import { Loading } from './pages/loading/loading';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedex');

  public loadingService = inject(LoadingService);
}
