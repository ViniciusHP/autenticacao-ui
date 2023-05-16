import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnchorModule } from './anchor/anchor.module';
import { ErrorMessageFieldModule } from './error-message-field/error-message-field.module';
import { FormCardModule } from './form-card/form-card.module';
import { InputPasswordModule } from './input-password/input-password.module';
import { InputModule } from './input/input.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorMessageFieldModule,
    AnchorModule,
    InputModule,
    FormCardModule,
    InputPasswordModule,
  ],
  exports: [
    ErrorMessageFieldModule,
    AnchorModule,
    InputModule,
    FormCardModule,
    InputPasswordModule,
  ],
  declarations: [],
})
export class SharedComponentsModule {}
