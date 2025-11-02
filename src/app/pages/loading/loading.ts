/**
 * @file loading.ts
 * @author Laylson Albuquerque
 * @version 1.0
 *
 * @description
 * Lógica do Componente de Tela de Carregamento (Loading).
 *
 * Este é um componente "burro" (dumb component) focado puramente em 
 * apresentação (HTML/CSS). Ele não contém lógica TypeScript e apenas 
 * exibe a animação. A lógica para mostrá-lo ou escondê-lo 
 * (adicionando a classe '.recolhendo') será controlada pelo 
 * componente "pai" app.html.
 *
 * @see app.html
 */

import { Component } from '@angular/core';
 
@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {

}
