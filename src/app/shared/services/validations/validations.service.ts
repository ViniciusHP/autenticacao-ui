import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Classe para validação de campos de formulário.
 */
@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor() {}

  /**
   * Validator que verifica se a senha informada no campo de senha e no campo atual são iguais.
   *
   * @param fnGetPasswordControl - Função responsável por obtem o campo de formulário onde está a senha digitada.
   * @returns null caso as senhas estejam iguais, caso contrário, objeto para erro de campo de formulário.
   */
  public confirmPassword(fnGetPasswordControl: () => AbstractControl | null) {
    return (confirmPasswordControl: AbstractControl) => {
      const passwordControl = fnGetPasswordControl();
      if (
        !passwordControl ||
        passwordControl?.invalid ||
        confirmPasswordControl.untouched ||
        !confirmPasswordControl.value
      ) {
        return null;
      }

      const password = passwordControl?.value;
      const confirmacaoPassword = confirmPasswordControl.value;

      return password === confirmacaoPassword
        ? null
        : { confirmacaoSenha: true };
    };
  }
}
