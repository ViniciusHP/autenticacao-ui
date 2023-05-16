import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { fadeAndSlide } from 'src/app/shared/animations/fade-and-slide.animation';
import { MessageValidation } from 'src/app/shared/components/error-message-field/model/message-validation.model';
import { ApplicationExceptionService } from 'src/app/shared/services/application-exception/application-exception.service';
import { ValidationsService } from 'src/app/shared/services/validations/validations.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'vhp-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
  animations: [fadeAndSlide],
})
export class RedefinirSenhaComponent {
  public formGroup!: FormGroup;
  public validationMessages!: { [key: string]: MessageValidation[] };
  public isFormInvalid: boolean = true;
  public isLoading: boolean = false;

  public token!: string;
  private _unsubscribeForms = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _usuariosService: UsuariosService,
    private _messageService: MessageService,
    private _translate: TranslateService,
    private _applicationExceptionService: ApplicationExceptionService,
    private _router: Router,
    private _validations: ValidationsService
  ) {}

  public ngOnInit(): void {
    this.token = this._activatedRoute.snapshot.params['token'];

    this.formGroup = this._createForm();
    this.validationMessages = this._createValidationMessages();
    this._observeFormState();
  }

  public ngOnDestroy(): void {
    this._unsubscribeForms.next();
    this._unsubscribeForms.complete();
  }

  /**
   * Redefine senha de usuário.
   */
  public redefinirSenha(): void {
    this.isLoading = true;
    const password = this.formGroup.get('password')?.value;
    this._usuariosService.redefinirSenha(password, this.token).subscribe({
      next: () => {
        this._successNewPassword();
      },
      error: (e) => this._errorNewPassword(e),
      complete: () => (this.isLoading = false),
    });
  }

  /**
   * Exibe mensagem de sucesso ao redefinir senha de usuário e navega para página de login.
   */
  private _successNewPassword() {
    this._messageService.add({
      severity: 'success',
      detail: this._translate.instant(
        'redefinir_senha.descriptions.redefinida_senha_com_sucesso'
      ),
    });
    this._router.navigate(['login']);
  }

  /**
   * Exibe mensagem de erro ao tentar redefinir senha de usuário.
   */
  private _errorNewPassword(error: any) {
    this._messageService.add({
      severity: 'error',
      detail:
        this._applicationExceptionService.getApplicationExceptionsMessages(
          error,
          'redefinir_senha.descriptions.nao_foi_possivel_redefinir_senha'
        ),
    });
  }

  /**
   * Cria formulário de redefinição de senha do usuário.
   *
   * @returns formulário.
   */
  private _createForm(): FormGroup {
    return this._fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [
        null,
        [
          Validators.required,
          this._validations.confirmPassword(() =>
            this.formGroup?.get('password')
          ),
        ],
      ],
    });
  }

  /**
   * Cria mensagens de validação para cada Validator aplicado nos campos de formulário.
   *
   * @returns Array com mensagens de validação dos campos de formulário.
   */
  private _createValidationMessages(): { [key: string]: MessageValidation[] } {
    return {
      password: [
        {
          validationName: 'required',
          validationMessage: 'common.fields.senha.validations.required',
        },
      ],
      confirmPassword: [
        {
          validationName: 'required',
          validationMessage:
            'common.fields.confirmar_senha.validations.required',
        },
        {
          validationName: 'confirmacaoSenha',
          validationMessage:
            'common.fields.confirmar_senha.validations.confirmacaoSenha',
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
