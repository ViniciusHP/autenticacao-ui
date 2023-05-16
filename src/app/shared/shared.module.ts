import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedComponentsModule, TranslateModule],
  exports: [SharedComponentsModule, TranslateModule],
})
export class SharedModule {}
