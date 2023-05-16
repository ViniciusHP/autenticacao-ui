import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ApplicationExceptionMessage,
  ApplicationExceptionMessages,
} from '../../model/application-exception-message.model';

/**
 * Classe responsável por lidar com errors de requisição no formato do back end da aplicação.
 */
@Injectable({
  providedIn: 'root',
})
export class ApplicationExceptionService {
  constructor(private _translate: TranslateService) {}

  /**
   * Verifica se o erro é do formato do back end da aplicação.
   *
   * @param errors - objeto de erro
   * @returns true se o formato de erro é do back end, caso contrário, false
   */
  public isApplicationException(errors: any): boolean {
    if (!errors) {
      return false;
    }

    if (!Array.isArray(errors)) {
      return false;
    }

    return errors.every((e: ApplicationExceptionMessage) => e?.message != null);
  }

  /**
   * Extrai lista de mensagens de erro do back end e converte para uma única mensagem.
   *
   * @param errorResponse - Objeto de erro HTTP.
   * @param defaultMessage - Mensagem a ser retornada caso o erro não seja no formato do back end.
   * @returns Mensagem única com todas mensagens de erro do back end, ou mensagem default caso o erro não seja no formato do back end.
   */
  public getApplicationExceptionsMessages(
    errorResponse: HttpErrorResponse,
    defaultMessage: string
  ): string {
    const errors = errorResponse.error as ApplicationExceptionMessages;

    if (!this.isApplicationException(errors)) {
      return this._translate.instant(defaultMessage);
    }

    return errors.reduce(
      (acc, v, i) =>
        this._concatApplicationExceptionMessages(acc, v, i, errors.length),
      ''
    );
  }

  /**
   * Concatena mensagens de erro.
   *
   * @param accumulator - Variável que acumula todas as outras mensagens.
   * @param currentValue - Mensagem de erro atual.
   * @param currentIndex - Índice da mensagem de erro atual.
   * @param arrayLength - Quantidade de mensagens de erro.
   * @returns Concatenação das mensagens de erro anteriores com a mensagem de erro atual.
   */
  private _concatApplicationExceptionMessages(
    accumulator: string,
    currentValue: ApplicationExceptionMessage,
    currentIndex: number,
    arrayLength: number
  ): string {
    let message = accumulator + currentValue.message;

    if (!message.endsWith('.')) {
      message = message + '.';
    }

    if (currentIndex != arrayLength - 1) {
      return message + ' ';
    }

    return message;
  }
}
