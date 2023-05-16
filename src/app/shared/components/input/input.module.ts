import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorMessageFieldModule } from '../error-message-field/error-message-field.module';
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    ErrorMessageFieldModule,
    InputTextModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [InputComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
export class InputModule {}
