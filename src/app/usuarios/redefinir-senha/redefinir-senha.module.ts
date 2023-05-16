import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { RedefinirSenhaComponent } from './redefinir-senha.component';

@NgModule({
  declarations: [RedefinirSenhaComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, ButtonModule],
  exports: [RedefinirSenhaComponent],
})
export class RedefinirSenhaModule {}
