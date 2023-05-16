import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlStatus,
  NgControl,
} from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { MessageValidation } from '../error-message-field/model/message-validation.model';

@Component({
  selector: 'vhp-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent
  implements OnInit, OnChanges, OnDestroy, ControlValueAccessor
{
  @Input()
  public disabled = false;

  @Input()
  public label: string = '';

  @Input()
  public value!: string;

  @Input()
  public validations!: MessageValidation[];

  @Input()
  public prefixIcon!: string | PrimeIcons;

  @Input()
  public sufixIcon!: string | PrimeIcons;

  @Input()
  public feedback!: boolean;

  @Input()
  public showPassword: boolean = true;

  @Input()
  public showClear: boolean = true;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onChange = (value: string) => {};
  public onTouched = () => {};

  public field!: AbstractControl | null;
  public uniqueId!: string;

  public classes!: any;
  public iconClasses!: string[];
  public wrapperClasses!: { [key: string]: boolean };
  private _unsubscribeState = new Subject<void>();

  constructor(
    @Optional() @Self() private _ngControl: NgControl,
    private uniqueIdService: UniqueIdService
  ) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.uniqueId = this.uniqueIdService.generateUniqueIdWithPrefix('INPUT');
    this.field = this._ngControl?.control;
    this.field?.statusChanges
      .pipe(takeUntil(this._unsubscribeState), debounceTime(300))
      .subscribe((status: FormControlStatus) => {
        if (this.field?.touched && status != 'PENDING') {
          this._updateClass();
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['prefixIcon'] || changes['sufixIcon']) {
      this._handleIconChanges(changes);
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribeState.next();
    this._unsubscribeState.complete();
  }

  /**
   * Atualiza valor atual do campo e notifica mudança de valor do campo.
   *
   * @param value - Valor atual do campo
   */
  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  /**
   * Obtém função que notifica mudança de valor do campo.
   *
   * @param fn - Função que notifica mudança de valor do campo.
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Obtém função que marca o campo como tocado.
   *
   * @param fn - Função que marca o campo como tocado.
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Altera estado do campo para habilitado/desabilitado.
   *
   * @param isDisabled - Estado do campo habilitado/desabilitado.
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Recebe valor do campo ao ser alterado.
   *
   * @param value - Novo valor do campo.
   */
  public valueChanges(value: string) {
    if (value !== '') {
      this.onTouched();
    }

    this.writeValue(value);
  }

  /**
   * Atualiza classes de validação de formulário.
   */
  private _updateClass(): void {
    this.classes = {
      'ng-invalid': this.field?.invalid,
      'ng-valid': this.field?.valid,
      'ng-touched': this.field?.touched,
      'ng-dirty': this.field?.dirty,
      'ng-pristine': this.field?.pristine,
      'ng-untouched': this.field?.untouched,
    };
  }

  /**
   * Atualiza classes de ícones prefixos e sufixos.
   *
   * @param changes - Alterações feitas.
   */
  private _handleIconChanges(changes: SimpleChanges) {
    this.wrapperClasses = {
      'p-input-icon-left': !!changes['prefixIcon'],
      'p-input-icon-right': !!changes['sufixIcon'],
    };
  }
}
