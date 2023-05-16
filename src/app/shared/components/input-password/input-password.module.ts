import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';
import { ErrorMessageFieldModule } from '../error-message-field/error-message-field.module';
import { InputPasswordComponent } from './input-password.component';

@NgModule({
  declarations: [InputPasswordComponent],
  imports: [
    CommonModule,
    ErrorMessageFieldModule,
    TranslateModule,
    PasswordModule,
  ],
  exports: [InputPasswordComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputPasswordComponent),
    },
  ],
})
export class InputPasswordModule {}
