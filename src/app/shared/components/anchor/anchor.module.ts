import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AnchorComponent } from './anchor.component';

@NgModule({
  declarations: [AnchorComponent],
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  exports: [AnchorComponent],
})
export class AnchorModule {}
