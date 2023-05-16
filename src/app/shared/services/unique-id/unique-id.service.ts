import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

/**
 * Classe responsável por gerar Ids únicos.
 */
@Injectable({
  providedIn: 'root',
})
export class UniqueIdService {
  private numberOfGeneratedIds = 0;

  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;

  constructor() {}

  /**
   * Gera Id único a partir de prefixo informado.
   *
   * @param prefix - Prefixo a ser utilizado no id.
   * @returns Id único com prefixo.
   */
  public generateUniqueIdWithPrefix(prefix: string): string {
    if (!prefix || !this.validId.test(prefix)) {
      throw Error('Prefix can not be empty');
    }
    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  /**
   * Obtém número de Ids gerados por esta classe.
   *
   * @returns Número de Ids gerados;
   */
  public getNumberOfGeneratedUniqueIds(): number {
    return this.numberOfGeneratedIds;
  }

  /**
   * Gera Id UUID único.
   *
   * @returns Id único.
   */
  private generateUniqueId(): string {
    return uuidv4();
  }
}
