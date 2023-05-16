import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import { fadeAndSlide } from 'src/app/shared/animations/fade-and-slide.animation';
import { MessageValidation } from 'src/app/shared/components/error-message-field/model/message-validation.model';
import { ValidationsService } from 'src/app/shared/services/validations/validations.service';
import { NovoUsuarioForm } from '../model/novo-usuario-form';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'vhp-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
  animations: [fadeAndSlide],
})
export class CadastroUsuarioComponent implements OnInit, OnDestroy {
  public icons = {
    sufixIconEmail: PrimeIcons.AT,
    sufixIconUser: PrimeIcons.USER,
    sufixIconLock: PrimeIcons.LOCK,
    iconReturn: PrimeIcons.ANGLE_LEFT,
  };

  public formGroup!: FormGroup;
  public validationMessages!: { [key: string]: MessageValidation[] };
  public isFormInvalid: boolean = true;
  public isLoading = false;

  private _unsubscribeForms = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuariosService,
    private _messageService: MessageService,
    private _router: Router,
    private _translate: TranslateService,
    private _validations: ValidationsService
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
   * Cadastra um novo usuário no sistema.
   */
  public cadastrarUsuario(): void {
    this.isLoading = true;
    const novoUsuarioForm = this.formGroup.value as NovoUsuarioForm;
    this._usuarioService.novoUsuario(novoUsuarioForm).subscribe({
      next: () => this._successNewUser(),
      error: () => this._errorNewUser(),
      complete: () => (this.isLoading = false),
    });
  }

  /**
   * Validator que verifica se o email digitado no campo já está cadastrado no sistema.
   *
   * @param control - Campo de formulário que terá a validação.
   * @returns null caso o email esteja disponível, caso contrário, objeto para erro de campo de formulário.
   */
  public emailDisponivel(control: AbstractControl): Observable<any> {
    if (control.hasError('required') || control.hasError('email')) {
      return of(null);
    }

    const email = control.value;

    return timer(200).pipe(
      switchMap(() => {
        return this._usuarioService.isEmailDisponivel(email).pipe(
          map(() => null),
          catchError(() =>
            of({
              emailDisponivel: true,
            })
          )
        );
      })
    );
  }

  /**
   * Exibe mensagem de sucesso ao cadastrar novo usuário e navega para a página de login.
   */
  private _successNewUser(): void {
    this._router.navigate(['login']);
    this._messageService.add({
      severity: 'success',
      sticky: false,
      detail: this._translate.instant(
        'cadastro_usuario.descriptions.usuario_cadastrado_com_sucesso'
      ),
    });
  }

  /**
   * Exibe mensagem de erro ao tentar cadastrar usuário.
   */
  private _errorNewUser(): void {
    this._messageService.add({
      severity: 'error',
      sticky: false,
      detail: this._translate.instant(
        'cadastro_usuario.descriptions.erro_cadastro_usuario'
      ),
    });
  }

  /**
   * Cria formulário de cadastro de novo usuário.
   *
   * @returns formulário.
   */
  private _createForm(): FormGroup {
    return this._fb.group({
      name: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.emailDisponivel.bind(this)],
      ],
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
      name: [
        {
          validationName: 'required',
          validationMessage: 'common.fields.nome.validations.required',
        },
      ],
      email: [
        {
          validationName: 'required',
          validationMessage: 'common.fields.email.validations.required',
        },
        {
          validationName: 'email',
          validationMessage: 'common.fields.email.validations.email',
        },
        {
          validationName: 'emailDisponivel',
          validationMessage: 'common.fields.email.validations.emailDisponivel',
        },
      ],
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
