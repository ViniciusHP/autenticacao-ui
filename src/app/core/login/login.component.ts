import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import { Subject, finalize, takeUntil } from 'rxjs';
import { fadeAndSlide } from 'src/app/shared/animations/fade-and-slide.animation';
import { MessageValidation } from 'src/app/shared/components/error-message-field/model/message-validation.model';
import { ApplicationExceptionService } from 'src/app/shared/services/application-exception/application-exception.service';
import { OauthAuthenticationService } from '../security/services/oauth-authentication/oauth-authentication.service';
import { RedirectAfterLoginService } from '../services/redirect-after-login/redirect-after-login.service';

@Component({
  selector: 'vhp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAndSlide],
})
export class LoginComponent implements OnInit, OnDestroy {
  public icons = {
    sufixIconEmail: PrimeIcons.AT,
    sufixIconLock: PrimeIcons.LOCK,
  };

  public isFormInvalid = true;
  public formLogin!: FormGroup;

  public validationMessages!: { [key: string]: MessageValidation[] };
  public isLoading = false;

  private _unsubscribeForm!: Subject<void>;

  constructor(
    private _fb: FormBuilder,
    private _oauthAuthentication: OauthAuthenticationService,
    private _message: MessageService,
    private _redirectAfterLogin: RedirectAfterLoginService,
    private _applicationException: ApplicationExceptionService,
    private _translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this._unsubscribeForm = new Subject<void>();
    this.formLogin = this._createForm();
    this._observeFormChanges();
    this._createValidationMessages();
  }

  public ngOnDestroy(): void {
    this._unsubscribeForm.next();
    this._unsubscribeForm.complete();
  }

  /**
   * Executa requisição para autenticar usuário
   */
  public fazerLogin(): void {
    this.isLoading = true;
    const valorFormulario = this.formLogin.value;
    this._oauthAuthentication
      .authenticate(valorFormulario['email'], valorFormulario['password'])
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (name: string | null) => this._successLogin(name),
        error: (res: HttpErrorResponse) => this._errorLogin(res),
      });
  }

  /**
   * Exibe mensagem de sucesso na autenticação e redireciona para página que usuário tentou acessar desde o início
   *
   * @param name - Nome do usuário
   */
  private _successLogin(name: string | null) {
    this._message.add({
      severity: 'info',
      summary: this._translate.instant('login.labels.login_efetuado'),
      detail: this._translate.instant('login.descriptions.bem_vindo_usuario', {
        usuario: name,
      }),
    });
    this._redirectAfterLogin.redirectToPageAccessedBeforeLogin();
  }

  /**
   * Exibe mensagem de erro na autenticação do usuário.
   *
   * @param res - Resposta de erro da requisição de autenticação
   */
  private _errorLogin(res: HttpErrorResponse) {
    let mensagem =
      res.status == 400
        ? 'login.descriptions.usuario_senha_invalidos'
        : 'login.descriptions.ocorreu_erro_login';

    mensagem = this._applicationException.getApplicationExceptionsMessages(
      res,
      mensagem
    );

    this._message.add({
      severity: 'error',
      detail: mensagem,
    });
  }

  /**
   * Cria mensagens de erros para validações dos campos de formulário
   */
  private _createValidationMessages() {
    this.validationMessages = {
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
      password: [
        {
          validationName: 'required',
          validationMessage: 'common.fields.senha.validations.required',
        },
      ],
    };
  }

  /**
   * Cria formulário do login.
   *
   * @returns Formulário do login
   */
  private _createForm(): FormGroup {
    return this._fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  /**
   * Observa as mudanças dos campos do formulário.
   */
  private _observeFormChanges() {
    this.formLogin.valueChanges
      .pipe(takeUntil(this._unsubscribeForm))
      .subscribe(() => {
        this.isFormInvalid = this.formLogin.invalid;
      });
  }
}
