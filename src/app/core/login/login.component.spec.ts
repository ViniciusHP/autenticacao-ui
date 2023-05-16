import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { TestingModule } from 'src/app/shared/tests/testing.module';

import { OauthAuthenticationService } from '../security/services/oauth-authentication/oauth-authentication.service';
import { RedirectAfterLoginService } from '../services/redirect-after-login/redirect-after-login.service';
import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';

describe(LoginComponent.name, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let oauthAuthentication: OauthAuthenticationService;
  let messageService: MessageService;
  let redirectAfterLogin: RedirectAfterLoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [LoginModule, TestingModule],
      providers: [OauthAuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    oauthAuthentication = TestBed.inject(OauthAuthenticationService);
    messageService = TestBed.inject(MessageService);
    redirectAfterLogin = TestBed.inject(RedirectAfterLoginService);

    component = fixture.componentInstance;
  });

  it('SHOULD create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it(`SHOULD form be invalid WHEN form is empty`, () => {
    fixture.detectChanges();

    expect(component.isFormInvalid).toBeTruthy();
  });

  it(`SHOULD form be valid WHEN email and password is entered`, () => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    expect(component.isFormInvalid).toBeFalsy();
  });

  it(`SHOULD form be valid WHEN email and password is entered`, () => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    expect(component.isFormInvalid).toBeFalsy();
  });

  it(`SHOULD email field be invalid WHEN email field is touched and empty`, () => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.markAsTouched();

    fixture.detectChanges();

    expect(emailField?.invalid).toBeTruthy();
  });

  it(`SHOULD email field be valid WHEN email is entered`, () => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    fixture.detectChanges();

    expect(emailField?.valid).toBeTruthy();
  });

  it(`SHOULD password field be invalid WHEN password field is touched and empty`, () => {
    fixture.detectChanges();

    const passwordField = component.formLogin.get('password');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    expect(passwordField?.invalid).toBeTruthy();
  });

  it(`SHOULD password field be valid WHEN password is entered`, () => {
    fixture.detectChanges();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    expect(passwordField?.valid).toBeTruthy();
  });

  it(`(D) SHOULD enter button be disabled WHEN form is invalid`, () => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;

    expect(button.disabled).toBeTruthy();
  });

  it(`(D) SHOULD enter button be enabled WHEN form is valid`, () => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;

    expect(button.disabled).toBeFalsy();
  });

  it(`SHOULD show success message WHEN user has successfully logged in`, (done) => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    spyOn(oauthAuthentication, 'authenticate').and.returnValue(of('Vinicius'));
    spyOn(redirectAfterLogin, 'redirectToPageAccessedBeforeLogin').and.callFake(
      () => null
    );

    spyOn(messageService, 'add').and.callFake((message) => {
      expect(message.detail).toContain('login.descriptions.bem_vindo_usuario');
      expect(message.summary).toContain('login.labels.login_efetuado');
      done();
    });

    component.fazerLogin();
  });

  it(`SHOULD redirect to page accessed before login WHEN user has successfully logged in`, (done) => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    spyOn(oauthAuthentication, 'authenticate').and.returnValue(of('Vinicius'));

    spyOn(redirectAfterLogin, 'redirectToPageAccessedBeforeLogin').and.callFake(
      () => {
        expect().nothing();
        done();
      }
    );

    component.fazerLogin();
  });

  it(`SHOULD show invalid user/password error message WHEN when user failed to login AND status code is 400`, (done) => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    const error = new HttpErrorResponse({
      status: 400,
    });

    spyOn(oauthAuthentication, 'authenticate').and.returnValue(
      throwError(() => error)
    );

    spyOn(messageService, 'add').and.callFake((message) => {
      expect(message.detail).toContain(
        'login.descriptions.usuario_senha_invalidos'
      );
      done();
    });

    component.fazerLogin();
  });

  it(`SHOULD show generic error message WHEN when user failed to login AND status code is other than 400`, (done) => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    const error = new HttpErrorResponse({
      status: 401,
    });

    spyOn(oauthAuthentication, 'authenticate').and.returnValue(
      throwError(() => error)
    );

    spyOn(messageService, 'add').and.callFake((message) => {
      expect(message.detail).toContain('login.descriptions.ocorreu_erro_login');
      done();
    });

    component.fazerLogin();
  });

  it(`SHOULD redirect to page accessed before login WHEN user has successfully logged in`, (done) => {
    fixture.detectChanges();

    const emailField = component.formLogin.get('email');
    emailField?.setValue('email@email.com');
    emailField?.markAsTouched();

    const passwordField = component.formLogin.get('password');
    passwordField?.setValue('123456');
    passwordField?.markAsTouched();

    fixture.detectChanges();

    spyOn(oauthAuthentication, 'authenticate').and.returnValue(of('Vinicius'));
    spyOn(redirectAfterLogin, 'redirectToPageAccessedBeforeLogin').and.callFake(
      () => {
        expect().nothing();
        done();
      }
    );

    component.fazerLogin();
  });
});
