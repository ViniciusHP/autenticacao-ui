import { Component } from '@angular/core';
import { fadeAndSlide } from 'src/app/shared/animations/fade-and-slide.animation';

@Component({
  selector: 'vhp-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss'],
  animations: [fadeAndSlide],
})
export class PaginaNaoEncontradaComponent {}
