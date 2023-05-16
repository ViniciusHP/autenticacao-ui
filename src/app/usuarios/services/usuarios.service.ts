import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NovoUsuarioForm } from '../model/novo-usuario-form';

const contextAPI = environment.apiUrl;

/**
 * Classe responsável por obter recursos de usuário.
 */
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private _prefixURL: string = `${contextAPI}/usuarios`;

  constructor(private _http: HttpClient) {}

  /**
   * Verifica se o email está disponível para cadastro de usuário.
   *
   * @param email - Email a ser verificado.
   * @returns Observable de resposta.
   */
  public isEmailDisponivel(email: string): Observable<void> {
    const httpParams = new HttpParams().append('email', email);

    return this._http.get<void>(`${this._prefixURL}/email-disponivel`, {
      params: httpParams,
    });
  }

  /**
   * Cadastra novo usuário.
   *
   * @param novoUsuarioForm - Informações do novo usuário.
   * @returns Observable de resposta.
   */
  public novoUsuario(novoUsuarioForm: NovoUsuarioForm): Observable<void> {
    return this._http.post<void>(`${this._prefixURL}`, novoUsuarioForm);
  }

  /**
   * Abre solicitação de recuperação de senha do usuário associado ao email.
   *
   * @param email - Email do usuário
   * @returns Observable de resposta.
   */
  public solicitarRecuperacaoSenha(email: string): Observable<void> {
    return this._http.post<void>(`${this._prefixURL}/recuperar-senha`, {
      email,
    });
  }

  /**
   * Solicita redefinição de senha do usuário a partir de token de recuperação.
   *
   * @param password - Nova senha do usuário.
   * @param token - Token de recuperação de senha.
   * @returns Observable de resposta.
   */
  public redefinirSenha(password: string, token: string): Observable<void> {
    return this._http.post<void>(`${this._prefixURL}/redefinir-senha`, {
      password,
      token,
    });
  }
}
