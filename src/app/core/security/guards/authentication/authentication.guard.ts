import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { RedirectAfterLoginService } from 'src/app/core/services/redirect-after-login/redirect-after-login.service';
import { OauthAuthenticationService } from '../../services/oauth-authentication/oauth-authentication.service';

/**
 * Classe responsável por barrar a navegação de rota e o lazy loading de módulos caso o usuário não esteja logado no sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(
    private _oauthAuthenticationService: OauthAuthenticationService,
    private _router: Router,
    private _redirectAfterLoginService: RedirectAfterLoginService
  ) {}

  public canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.validate(route?.path ?? '');
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.validate(state.url);
  }

  /**
   * Método que verifica se o usuário está logado, caso esteja, retornará true, caso contrário, tentará renovar a autenticação.
   * @param urlToRedirect - Rota que o usuário tentou acessar
   * @returns true se o usuário estiver logado, Observable com valor true caso a renovação de autenticação ocorreu corretamente,
   * caso contrário, retornará Observable com valor false
   */
  private validate(urlToRedirect: string): Observable<boolean> | boolean {
    if (this._oauthAuthenticationService.isUsuarioLogado()) {
      return true;
    }

    return this._oauthAuthenticationService.tryRefreshAuthentication().pipe(
      switchMap(() => of(true)),
      catchError((e) => {
        this._redirectAfterLoginService.setUrl(urlToRedirect);
        this._router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
