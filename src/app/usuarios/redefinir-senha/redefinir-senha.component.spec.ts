import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { UsuariosService } from '../services/usuarios.service';

import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { RedefinirSenhaModule } from './redefinir-senha.module';

describe(RedefinirSenhaComponent.name, () => {
  let component: RedefinirSenhaComponent;
  let fixture: ComponentFixture<RedefinirSenhaComponent>;
  let activatedRoute: ActivatedRoute;
  let usuariosService: UsuariosService;
  let messageService: MessageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedefinirSenhaComponent],
      imports: [RedefinirSenhaModule, TestingModule],
      providers: [UsuariosService],
    }).compileComponents();

    fixture = TestBed.createComponent(RedefinirSenhaComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuariosService = TestBed.inject(UsuariosService);
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);
  });

  it('SHOULD create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('SHOULD extract token from param url WHEN created', () => {
    activatedRoute.snapshot.params['token'] = 'tokenTest';
    fixture.detectChanges();
    expect(component.token).toBe('tokenTest');
  });

  it('(D) SHOULD reset password WHEN form is valid and token is valid', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(new Promise(() => null));
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuariosService, 'redefinirSenha').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );

    activatedRoute.snapshot.params['token'] = 'tokenTest';
    fixture.detectChanges();
    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('newPassword');

    const confirmPasswold = component.formGroup.get('confirmPassword');
    confirmPasswold?.setValue('newPassword');

    component.formGroup.markAsTouched();
    component.formGroup.updateValueAndValidity();

    tick(200);
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;
    buttonEl.click();
    tick(200);

    expect(buttonEl.disabled).withContext('Reset button disabled').toBeFalse();
    expect(component.isFormInvalid).withContext('Form invalid').toBeFalse();
    expect(usuariosService.redefinirSenha).toHaveBeenCalledWith(
      'newPassword',
      'tokenTest'
    );
  }));

  it('SHOULD show success message and navigate to login WHEN password was reseted', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(new Promise(() => null));
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuariosService, 'redefinirSenha').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );

    activatedRoute.snapshot.params['token'] = 'tokenTest';
    fixture.detectChanges();
    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('newPassword');

    const confirmPasswold = component.formGroup.get('confirmPassword');
    confirmPasswold?.setValue('newPassword');

    component.formGroup.markAsTouched();
    component.formGroup.updateValueAndValidity();

    tick(200);
    component.redefinirSenha();
    tick(200);

    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      detail: 'redefinir_senha.descriptions.redefinida_senha_com_sucesso',
    });
  }));

  it('SHOULD show error message WHEN reset password failed', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(new Promise(() => null));
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuariosService, 'redefinirSenha').and.returnValue(
      throwError(() => new Error())
    );

    activatedRoute.snapshot.params['token'] = 'tokenTest';
    fixture.detectChanges();
    const passwordField = component.formGroup.get('password');
    passwordField?.setValue('newPassword');

    const confirmPasswold = component.formGroup.get('confirmPassword');
    confirmPasswold?.setValue('newPassword');

    component.formGroup.markAsTouched();
    component.formGroup.updateValueAndValidity();

    tick(200);
    component.redefinirSenha();
    tick(200);

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      detail: 'redefinir_senha.descriptions.nao_foi_possivel_redefinir_senha',
    });
  }));
});
