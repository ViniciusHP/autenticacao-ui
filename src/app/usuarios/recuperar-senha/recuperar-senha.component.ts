import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { fadeAndSlide } from 'src/app/shared/animations/fade-and-slide.animation';
import { MessageValidation } from 'src/app/shared/components/error-message-field/model/message-validation.model';
import { ApplicationExceptionService } from 'src/app/shared/services/application-exception/application-exception.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'vhp-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss'],
  animations: [fadeAndSlide],
})
export class RecuperarSenhaComponent {
  public icons = {
    sufixIconEmail: PrimeIcons.AT,
  };

  public formGroup!: FormGroup;
  public validationMessages!: { [key: string]: MessageValidation[] };
  public isFormInvalid: boolean = true;
  public isLoading: boolean = false;

  private _unsubscribeForms = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _usuariosService: UsuariosService,
    private _messageService: MessageService,
    private _translate: TranslateService,
    private _applicationExceptionService: ApplicationExceptionService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this._createForm();
    this.validationMessages = this._createValidationMessages();
    this._observeFormState();
  }

  public ngOnDestroy(): void {
    this._unsubscribeForms.next();
    this._unsubscribeForms.complete();
  }

  /**
   * Solicita a recuperação de senha do usuário associado ao email.
   */
  public recuperarSenha(): void {
    this.isLoading = true;
    const email = this.formGroup.get('email')?.value;
    this._usuariosService.solicitarRecuperacaoSenha(email).subscribe({
      next: () => this._successPasswordRecovery(email),
      error: (e) => this._errorPasswordRecovery(e),
      complete: () => (this.isLoading = false),
    });
  }

  /**
   * Exibe mensagem de sucesso ao solicitar recuperação de senha.
   */
  private _successPasswordRecovery(email: string): void {
    this._messageService.add({
      severity: 'success',
      detail: this._translate.instant(
        'recuperar_senha.descriptions.email_recuperacao_enviado',
        { email }
      ),
    });
  }

  /**
   * Exibe mensagem de erro ao tentar solicitar a recuperação de senha.
   */
  private _errorPasswordRecovery(e: any): void {
    this._messageService.add({
      severity: 'error',
      detail:
        this._applicationExceptionService.getApplicationExceptionsMessages(
          e,
          'recuperar_senha.descriptions.nao_foi_possivel_solicitar_recuperacao_senha'
        ),
    });
  }

  /**
   * Cria formulário de recuperação de senha de usuário.
   *
   * @returns formulário.
   */
  private _createForm(): FormGroup {
    return this._fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  /**
   * Cria mensagens de validação para cada Validator aplicado nos campos de formulário.
   *
   * @returns Array com mensagens de validação dos campos de formulário.
   */
  private _createValidationMessages(): { [key: string]: MessageValidation[] } {
    return {
      email: [
        {
          validationName: 'required',
          validationMessage: 'common.fields.email.validations.required',
        },
        {
          validationName: 'email',
          validationMessage: 'common.fields.email.validations.email',
        },
      ],
    };
  }

  /**
   * Observa mudança no estado do formulário.
   */
  private _observeFormState(): void {
    this.formGroup.statusChanges
      .pipe(takeUntil(this._unsubscribeForms), debounceTime(200))
      .subscribe((_status: FormControlStatus) => {
        this.isFormInvalid = this.formGroup.invalid;
      });
  }
}
