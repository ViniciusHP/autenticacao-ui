import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../../services/storage/storage.service';
import { TokenDTO } from '../../modelo/token-dto.model';
import { TokenService } from '../token/token.service';

const contextAPI = environment.apiUrl;
const ACCESS_TOKEN = 'ACCESS_TOKEN';

/**
 * Classe responsável pelo fluxo de autenticação oauth.
 */
@Injectable({
  providedIn: 'root',
})
export class OauthAuthenticationService {
  private _prefixUrl = `${contextAPI}/oauth`;
  private _token!: TokenDTO;

  constructor(
    private _httpClient: HttpClient,
    private _storageService: StorageService,
    private _tokenService: TokenService
  ) {
    this._lerTokenAoIniciar();
  }

  /**
   * Executa a requisição de autenticação de usuário no sistema.
   *
   * @param email - Email do usuário
   * @param password - Senha do usuário
   * @returns {Observable<string | null>} Observable com o nome do usuário logado.
   */
  public authenticate(
    email: string,
    password: string
  ): Observable<string | null> {
    return this._doLogin(email, password).pipe(
      map((t) => {
        this._saveToken(t);
        return this._tokenService.getUsername(t.token);
      })
    );
  }

  /**
   * Renova a autenticação do usuário.
   *
   * @returns {Observable<string | null>} Observable com o nome do usuário logado.
   */
  public tryRefreshAuthentication(): Observable<string | null> {
    return this._refreshLogin().pipe(
      map((t) => {
        this._saveToken(t);
        return this._tokenService.getUsername(t.token);
      })
    );
  }

  /**
   * Efetua o encerramento de sessão do usuário.
   *
   * @returns {Observable<void>} Observable ao finalizar sessão.
   */
  public logout(): Observable<void> {
    return this._httpClient.delete<void>(`${this._prefixUrl}/revoke`);
  }

  /**
   * Verifica se o usuário atual está autenticado.
   *
   * @returns true caso o usuário está autenticado, caso contrário, false.
   */
  public isUsuarioLogado(): boolean {
    return !this._tokenService.isExpiredToken(this._token?.token);
  }

  /**
   * Obtém o nome do usuário logado.
   *
   * @returns Nome do usuário logado, caso ele esteja autenticado, caso contrário, null.
   */
  public getUsername(): string | null {
    return this._tokenService.getUsername(this._token?.token);
  }

  /**
   * Método para leitura do token salvo localmente no navegador.
   */
  private _lerTokenAoIniciar(): void {
    this._token = this._storageService.getObject<TokenDTO>(ACCESS_TOKEN);
  }

  /**
   * Executa requisição de autenticação do usuário
   *
   * @param email - Email do usuário.
   * @param password - Senha do usuário.
   * @returns Observable com objeto com informações do token de autenticação.
   */
  private _doLogin(email: string, password: string): Observable<TokenDTO> {
    return this._httpClient.post<TokenDTO>(
      `${this._prefixUrl}/token`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  /**
   * Executa renovação de autenticação do usuário.
   *
   * @returns Observable com objeto com informações do token de autenticação.
   */
  private _refreshLogin(): Observable<TokenDTO> {
    const authorizationHeader = this._tokenService.getAuthorizationHeader(
      this._token?.tipo,
      this._token?.token
    );

    let headers = authorizationHeader
      ? new HttpHeaders({ Authorization: authorizationHeader })
      : new HttpHeaders();

    const body = new HttpParams().set(`grant_type`, `refresh_token`);

    return this._httpClient.post<TokenDTO>(
      `${this._prefixUrl}/refresh-token`,
      body,
      { headers, withCredentials: true }
    );
  }

  /**
   * Salva token localmente no navegador.
   *
   * @param token
   */
  private _saveToken(token: TokenDTO): void {
    this._token = token;
    this._storageService.saveObject(ACCESS_TOKEN, token);
  }
}
