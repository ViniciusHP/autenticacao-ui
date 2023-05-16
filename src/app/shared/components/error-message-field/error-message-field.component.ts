import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControlStatus,
  ValidationErrors,
} from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MessageValidation } from './model/message-validation.model';

@Component({
  selector: 'vhp-error-message-field',
  templateUrl: './error-message-field.component.html',
  styleUrls: ['./error-message-field.component.scss'],
})
export class ErrorMessageFieldComponent implements OnChanges, OnDestroy {
  @Input()
  public field!: AbstractControl | null;

  @Input()
  public messages!: MessageValidation[];

  public icons = {
    error: PrimeIcons.TIMES_CIRCLE,
  };

  public errors!: MessageValidation[];

  private _unsubscribeField = new Subject<void>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['field']) {
      this._observeFieldState();
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribeField.next();
    this._unsubscribeField.complete();
  }

  /**
   * Observa mudança de status do campo de formulário para exibir ou não mensagens de erro.
   */
  private _observeFieldState() {
    this.field?.statusChanges
      .pipe(takeUntil(this._unsubscribeField), debounceTime(300))
      .subscribe((status: FormControlStatus) => {
        const isTouched = this.field?.touched;
        const containsErrors = !!this.field?.errors;

        if (status === 'INVALID' && isTouched && containsErrors) {
          this._createErrors(this.field?.errors as ValidationErrors);
        } else if (status === 'VALID' && isTouched) {
          this._clearErrors();
        }
      });
  }

  /**
   * Cria mensagens de erros a serem exibidos.
   *
   * @param errors - Lista de erros de validação de campo de formulário.
   */
  private _createErrors(errors: ValidationErrors) {
    this.errors = this.messages
      ?.filter((m) => !!errors[m.validationName])
      .map((m) => {
        return {
          validationMessage: m.validationMessage,
          validationName: m.validationName,
        };
      });
  }

  /**
   * Limpa lista de erros exibidos.
   */
  private _clearErrors() {
    this.errors = [];
  }
}
