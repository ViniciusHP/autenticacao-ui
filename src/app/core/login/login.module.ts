import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
    RippleModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
