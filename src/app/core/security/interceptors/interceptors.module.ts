import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OuathInterceptor } from './oauth/ouath.interceptor';

@NgModule({
  providers: [
    OuathInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OuathInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorsModule {}
