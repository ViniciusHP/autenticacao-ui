import { Injectable } from '@angular/core';

/**
 * Classe responsável por guardar e carregar informações localmente no navegador.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Salva objeto localmente no navegador.
   *
   * @param id - chave que será associada ao objeto salvo
   * @param object - objeto a ser salvo.
   */
  public saveObject(id: string, object: any): void {
    localStorage.setItem(id, JSON.stringify(object));
  }

  /**
   * Recupera objeto salvo localmente no navegador.
   *
   * @param id - chave para obter objeto salvo
   * @returns Objeto salvo localmente caso a chave seja encontrada, caso contrário, será retornado null.
   */
  public getObject<T>(id: string): T {
    const object = localStorage.getItem(id);
    return object ? JSON.parse(object) : null;
  }
}
