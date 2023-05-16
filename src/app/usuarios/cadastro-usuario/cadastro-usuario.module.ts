import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'src/app/shared/shared.module';

import { CadastroUsuarioComponent } from './cadastro-usuario.component';

@NgModule({
  declarations: [CadastroUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [CadastroUsuarioComponent],
})
export class CadastroUsuarioModule {}
