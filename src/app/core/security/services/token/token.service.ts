import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';
import { PayloadToken } from '../../modelo/payload-token.model';

/**
 * Classe utilitária para manupular token JWT.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private _translate: TranslateService) {}

  /**
   * Verifica se o token está expirado.
   *
   * @param token - token JWT
   * @returns true se o token está expirado ou nulo, caso contrário, false
   */
  public isExpiredToken(token: string): boolean {
    if (!token) {
      return true;
    }

    const dateExpiration = this.getDateExpiration(token);
    return dateExpiration == null || dateExpiration < new Date();
  }

  /**
   * Extrai payload do token JWT.
   *
   * @param token - token JWT
   * @returns Payload do token. Caso ocorra erro ao decodificar token, será retornado null.
   */
  public getPayload(token: string): PayloadToken | null {
    try {
      return jwt_decode<PayloadToken>(token);
    } catch (err) {
      return null;
    }
  }

  /**
   * Obtém nome do usuário.
   *
   * @param token - token JWT.
   * @returns Nome do usuário que está no token. Caso ocorra erro ao decodificar token, será retornado null.
   */
  public getUsername(token: string): string | null {
    const payload = this.getPayload(token);
    if (payload) {
      return payload?.name;
    }

    return null;
  }

  /**
   * Obtém data de expiração do token.
   *
   * @param token - token JWT.
   * @returns {Date} Data de expiração do token. Caso ocorra erro ao decodificar token, será retornado null.
   */
  public getDateExpiration(token: string): Date | null {
    const payload = this.getPayload(token);

    if (payload) {
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      return date;
    }

    return null;
  }

  /**
   * Verifica se o token é válido.
   *
   * @param token - token JWT.
   * @returns true caso a decodificação do token ocorra com sucesso, caso contrário, retorna false.
   */
  public isValidToken(token: string): boolean {
    const payload = this.getPayload(token);
    return payload != null;
  }

  /**
   * Retorna header HTTP para autenticação do token JWT
   *
   * @param type - tipo de token
   * @param token - token JWT
   * @returns Conteúdo para o header Authorization para autenticar o usuário. Caso ocorra erro ao decodificar token, será retornado null.
   */
  public getAuthorizationHeader(type: string, token: string): string | null {
    if (!type) {
      return null;
    }

    if (!this.isValidToken(token)) {
      return null;
    }

    return `${type} ${token}`;
  }
}
