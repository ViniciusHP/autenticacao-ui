import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageFieldComponent } from './error-message-field.component';

@NgModule({
  declarations: [ErrorMessageFieldComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ErrorMessageFieldComponent],
})
export class ErrorMessageFieldModule {}
