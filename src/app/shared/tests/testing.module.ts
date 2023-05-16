import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export class RouterDummy {}

@NgModule({
  imports: [
    HttpClientTestingModule,
    RouterTestingModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader,
      },
    }),
    ToastModule,
  ],
  exports: [
    HttpClientTestingModule,
    RouterTestingModule,
    NoopAnimationsModule,
    TranslateModule,
  ],
  providers: [MessageService],
})
export class TestingModule {}
