import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OauthAuthenticationService } from '../../services/oauth-authentication/oauth-authentication.service';

const contextAPI = environment.apiUrl;

const loginUrls = [
  `${contextAPI}/oauth/token`,
  `${contextAPI}/oauth/refresh-token`,
  `${contextAPI}/oauth/revoke`,
];

const usuarioUrls = [
  `${contextAPI}/usuarios/email-disponivel`,
  `${contextAPI}/usuarios`,
  `${contextAPI}/usuarios/recuperar-senha`,
  `${contextAPI}/usuarios/redefinir-senha`,
];

const assets = ['../../assets', './assets'];

/**
 * Classe responsável por barrar a requisição de recursos que é necessário autenticação, forçando a navegação para a página de login.
 */
@Injectable()
export class OuathInterceptor implements HttpInterceptor {
  constructor(
    private _oauthAuthenticationService: OauthAuthenticationService,
    private _router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = request.url;

    const isAssetsUrl = assets.some((a) => url.includes(a));
    const isLoginUrl = loginUrls.includes(url);
    const isUserUrl = usuarioUrls.includes(url);

    if (
      this._oauthAuthenticationService.isUsuarioLogado() ||
      isLoginUrl ||
      isAssetsUrl ||
      isUserUrl
    ) {
      return next.handle(request);
    }

    return this._oauthAuthenticationService.tryRefreshAuthentication().pipe(
      switchMap(() => {
        return next.handle(request);
      }),
      catchError((e) => {
        this._router.navigate(['/login']);
        return throwError(() => e);
      })
    );
  }
}
