import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Classe responsável por redirecionar usuário para a rota que tentou acessar antes de ser barrado pelo login.
 */
@Injectable({
  providedIn: 'root',
})
export class RedirectAfterLoginService {
  private _url!: string | null;

  constructor(private _router: Router) {}

  /**
   * Guarda url para ser acessada quando usuário logar no sistema.
   *
   * @param url - Caminho que usuário tentou acessar antes de estar autenticado.
   */
  public setUrl(url: string | null): void {
    this._url = url;
  }

  /**
   * Realiza navegação do usuário para caminho que tentou acessar antes de ser barrado pelo login.
   */
  public redirectToPageAccessedBeforeLogin() {
    const url = this._url == null ? '' : this._url;
    this._router.navigateByUrl(url);
    this._url = null;
  }
}
