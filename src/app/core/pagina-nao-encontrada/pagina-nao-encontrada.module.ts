import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  declarations: [PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    SharedModule,
  ],
  exports: [PaginaNaoEncontradaComponent],
})
export class PaginaNaoEncontradaModule {}
