import { HttpErrorResponse } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, of, throwError } from 'rxjs';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { UsuariosService } from '../services/usuarios.service';

import { CadastroUsuarioComponent } from './cadastro-usuario.component';
import { CadastroUsuarioModule } from './cadastro-usuario.module';

describe(CadastroUsuarioComponent.name, () => {
  let component: CadastroUsuarioComponent;
  let fixture: ComponentFixture<CadastroUsuarioComponent>;
  let usuarioService: UsuariosService;
  let router: Router;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroUsuarioComponent],
      imports: [CadastroUsuarioModule, TestingModule],
      providers: [MessageService, UsuariosService],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuariosService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
  });

  it('SHOULD create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`(D) SHOULD show name field error WHEN is touched and blank`, fakeAsync(() => {
    fixture.detectChanges();
    const nameField = component.formGroup.get('name');
    nameField?.setValue(null);
    nameField?.markAsTouched();
    nameField?.updateValueAndValidity();
    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input[label="common.fields.nome.label"]')
    )?.nativeElement as HTMLElement;

    expect(nameField?.hasError('required'))
      .withContext('Error required')
      .toBeTrue();
    expect(inputEl.textContent)
      .withContext('Error message')
      .toContain('common.fields.nome.validations.required');
  }));

  it(`(D) SHOULD show email field error WHEN is touched and blank`, fakeAsync(() => {
    fixture.detectChanges();
    const emailField = component.formGroup.get('email');
    emailField?.setValue(null);
    emailField?.markAsTouched();
    emailField?.updateValueAndValidity();
    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input[label="common.fields.email.label"]')
    )?.nativeElement as HTMLElement;

    expect(emailField?.hasError('required'))
      .withContext('Error required')
      .toBeTrue();
    expect(inputEl.textContent)
      .withContext('Error message')
      .toContain('common.fields.email.validations.required');
  }));

  it(`(D) SHOULD show email field error WHEN is touched and invalid email`, fakeAsync(() => {
    fixture.detectChanges();
    const emailField = component.formGroup.get('email');
    emailField?.setValue('teste123');
    emailField?.markAsTouched();
    emailField?.updateValueAndValidity();
    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input[label="common.fields.email.label"]')
    )?.nativeElement as HTMLElement;

    expect(emailField?.hasError('email')).withContext('Error email').toBeTrue();
    expect(inputEl.textContent)
      .withContext('Error message')
      .toContain('common.fields.email.validations.email');
  }));

  it(`(D) SHOULD show email field error WHEN is touched and with unavailable email`, fakeAsync(() => {
    spyOn(usuarioService, 'isEmailDisponivel').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 400 }))
    );

    fixture.detectChanges();

    const emailField = component.formGroup.get('email');
    emailField?.setValue('teste@email.com');
    emailField?.markAsTouched();
    emailField?.updateValueAndValidity();
    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input[label="common.fields.email.label"]')
    )?.nativeElement as HTMLElement;

    expect(emailField?.hasError('emailDisponivel'))
      .withContext('Error emailDisponivel')
      .toBeTrue();
    expect(inputEl.textContent)
      .withContext('Error message')
      .toContain('common.fields.email.validations.emailDisponivel');
  }));

  it(`(D) SHOULD show password field error WHEN is touched and blank`, fakeAsync(() => {
    fixture.detectChanges();
    const passwordField = component.formGroup.get('password');
    passwordField?.setValue(null);
    passwordField?.markAsTouched();
    passwordField?.updateValueAndValidity();
    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input-password[label="common.fields.senha.label"]')
    )?.nativeElement as HTMLElement;

    expect(passwordField?.hasError('required'))
      .withContext('Error required')
      .toBeTrue();
    expect(inputEl.textContent)
      .withContext('Error message')
      .toContain('common.fields.senha.validations.required');
  }));

  it(`(D) SHOULD show confirm password field error WHEN is touched and blank`, fakeAsync(() => {
    fixture.detectChanges();
    const confirmPasswordField = component.formGroup.get('confirmPassword');
    confirmPasswordField?.setValue(null);
    confirmPasswordField?.markAsTouched();
    confirmPasswordField?.updateValueAndValidity();
    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input-password[label="common.fields.confirmar_senha.label"]')
    )?.nativeElement as HTMLElement;

    expect(confirmPasswordField?.hasError('required'))
      .withContext('Error required')
      .toBeTrue();
    expect(inputEl.textContent)
      .withContext('Error message')
      .toContain('common.fields.confirmar_senha.validations.required');
  }));

  it(`(D) SHOULD show confirm password field error WHEN is touched and confirm password don't match password`, fakeAsync(() => {
    fixture.detectChanges();

    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('test123');
    passwordField?.markAsTouched();
    passwordField?.updateValueAndValidity();

    const confirmPasswordField = component.formGroup.get('confirmPassword');
    confirmPasswordField?.setValue('tset123');
    confirmPasswordField?.markAsTouched();
    confirmPasswordField?.updateValueAndValidity();

    tick(500);
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(
      By.css('vhp-input-password[label="common.fields.confirmar_senha.label"]')
    )?.nativeElement as HTMLElement;

    expect(confirmPasswordField?.hasError('confirmacaoSenha'))
      .withContext('Error confirmacaoSenha')
      .toBeTrue();

    expect(inputEl.innerHTML)
      .withContext('Error message')
      .toContain('common.fields.confirmar_senha.validations.confirmacaoSenha');
  }));

  it(`(D) SHOULD disable register button WHEN form is blank`, () => {
    fixture.detectChanges();
    component.formGroup.markAllAsTouched();
    const buttonEl = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;

    expect(buttonEl.disabled).toBeTrue();
  });

  it(`(D) SHOULD register user WHEN register button is clicked`, fakeAsync(() => {
    fixture.detectChanges();

    spyOn(router, 'navigate').and.returnValue(new Promise(() => null));
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuarioService, 'isEmailDisponivel').and.returnValue(of());
    spyOn(usuarioService, 'novoUsuario').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );

    const nameField = component.formGroup.get('name');
    nameField?.setValue('Test Name');

    const email = component.formGroup.get('email');
    email?.setValue('test@email');

    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('testpassword');

    const confirmPassword = component.formGroup.get('confirmPassword');
    confirmPassword?.setValue('testpassword');
    component.formGroup.markAllAsTouched();
    component.formGroup.updateValueAndValidity();

    tick(500);
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;

    buttonEl.click();

    expect(component.isFormInvalid).withContext('Form invalid').toBeFalse();
    expect(buttonEl.disabled)
      .withContext('Register button disabled')
      .toBeFalse();

    expect(usuarioService.novoUsuario).toHaveBeenCalledWith({
      name: 'Test Name',
      email: 'test@email',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    });
  }));

  it(`SHOULD navigate to login and show success message WHEN user was registered`, fakeAsync(() => {
    spyOn(usuarioService, 'novoUsuario').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );
    spyOn(usuarioService, 'isEmailDisponivel').and.returnValue(of());
    spyOn(router, 'navigate').and.returnValue(new Promise(() => null));
    spyOn(messageService, 'add').and.returnValue();

    fixture.detectChanges();

    const nameField = component.formGroup.get('name');
    nameField?.setValue('Test Name');

    const email = component.formGroup.get('email');
    email?.setValue('test@email.com');

    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('testpassword');

    const confirmPassword = component.formGroup.get('confirmPassword');
    confirmPassword?.setValue('testpassword');
    component.formGroup.markAllAsTouched();
    component.formGroup.updateValueAndValidity();

    tick(300);
    fixture.detectChanges();
    component.cadastrarUsuario();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(messageService.add).toHaveBeenCalled();
  }));

  it(`SHOULD show error message WHEN error occurred while registering new user`, fakeAsync(() => {
    spyOn(usuarioService, 'novoUsuario').and.returnValue(
      throwError(() => new Error())
    );
    spyOn(usuarioService, 'isEmailDisponivel').and.returnValue(of());
    spyOn(messageService, 'add').and.returnValue();

    fixture.detectChanges();

    const nameField = component.formGroup.get('name');
    nameField?.setValue('Test Name');

    const email = component.formGroup.get('email');
    email?.setValue('test@email.com');

    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('testpassword');

    const confirmPassword = component.formGroup.get('confirmPassword');
    confirmPassword?.setValue('testpassword');
    component.formGroup.markAllAsTouched();
    component.formGroup.updateValueAndValidity();

    tick(300);
    fixture.detectChanges();
    component.cadastrarUsuario();

    expect(messageService.add).toHaveBeenCalled();
  }));

  it(`SHOULD not has error 'emailDisponivel' WHEN email is available`, (done) => {
    spyOn(usuarioService, 'isEmailDisponivel').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );

    const emailControl = new FormControl({ value: '', disabled: false });
    emailControl?.setValue('test@email.com');
    emailControl.markAsTouched();

    component.emailDisponivel(emailControl).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it(`SHOULD not has error 'emailDisponivel' WHEN has 'email' error`, (done) => {
    const emailControl = new FormControl({ value: '', disabled: false }, [
      Validators.email,
    ]);
    emailControl?.setValue('test@');
    emailControl.markAsTouched();

    component.emailDisponivel(emailControl).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it(`SHOULD not has error 'emailDisponivel' WHEN has 'required' error`, (done) => {
    const emailControl = new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]);
    emailControl?.setValue('');
    emailControl.markAsTouched();

    component.emailDisponivel(emailControl).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it(`SHOULD has error 'emailDisponivel' WHEN email is unavailable`, (done) => {
    spyOn(usuarioService, 'isEmailDisponivel').and.returnValue(
      new Observable((s) => {
        s.error();
        s.complete();
      })
    );

    const emailControl = new FormControl({ value: '', disabled: false });
    emailControl?.setValue('test@email.com');
    emailControl.markAsTouched();

    component.emailDisponivel(emailControl).subscribe((result) => {
      expect(result).toEqual({
        emailDisponivel: true,
      });
      done();
    });
  });
});
