import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecuperarSenhaComponent } from './recuperar-senha.component';

@NgModule({
  declarations: [RecuperarSenhaComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, ButtonModule],
  exports: [RecuperarSenhaComponent],
})
export class RecuperarSenhaModule {}
