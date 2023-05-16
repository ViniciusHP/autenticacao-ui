import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';

import { FooterModule } from './footer/footer.module';
import { LoginModule } from './login/login.module';
import { PaginaNaoEncontradaModule } from './pagina-nao-encontrada/pagina-nao-encontrada.module';
import { InterceptorsModule } from './security/interceptors/interceptors.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(
    httpClient,
    environment.languageFilesPath,
    '.json'
  );
}

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    BrowserAnimationsModule,
    ToastModule,
    PaginaNaoEncontradaModule,
    HttpClientModule,
    InterceptorsModule,
    FooterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [LoginModule, ToastModule, FooterModule],
  providers: [MessageService],
})
export class CoreModule {}
