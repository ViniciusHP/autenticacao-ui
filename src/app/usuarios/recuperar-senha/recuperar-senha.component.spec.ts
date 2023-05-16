import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { UsuariosService } from '../services/usuarios.service';

import { RecuperarSenhaComponent } from './recuperar-senha.component';
import { RecuperarSenhaModule } from './recuperar-senha.module';

describe(RecuperarSenhaComponent.name, () => {
  let component: RecuperarSenhaComponent;
  let fixture: ComponentFixture<RecuperarSenhaComponent>;
  let usuariosService: UsuariosService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarSenhaComponent],
      imports: [RecuperarSenhaModule, TestingModule],
      providers: [UsuariosService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarSenhaComponent);
    component = fixture.componentInstance;
    usuariosService = TestBed.inject(UsuariosService);
    messageService = TestBed.inject(MessageService);
  });

  it('SHOULD create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`(D) SHOULD request password recovery WHEN form is valid and request button clicked`, fakeAsync(() => {
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuariosService, 'solicitarRecuperacaoSenha').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );

    fixture.detectChanges();
    const emailField = component.formGroup.get('email');
    const buttonEl = fixture.debugElement.query(By.css('button[type="submit"]'))
      .nativeElement as HTMLButtonElement;

    emailField?.setValue('test@email.com');
    emailField?.markAsTouched();
    emailField?.updateValueAndValidity();

    tick(500);
    fixture.detectChanges();

    buttonEl.click();

    expect(buttonEl.disabled)
      .withContext('Request password recovery button diabled')
      .toBeFalse();
    expect(usuariosService.solicitarRecuperacaoSenha).toHaveBeenCalledWith(
      'test@email.com'
    );
  }));

  it(`SHOULD show success message WHEN request password recovery done`, fakeAsync(() => {
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuariosService, 'solicitarRecuperacaoSenha').and.returnValue(
      new Observable((s) => {
        s.next();
        s.complete();
      })
    );

    fixture.detectChanges();
    const emailField = component.formGroup.get('email');

    emailField?.setValue('test@email.com');
    emailField?.markAsTouched();
    emailField?.updateValueAndValidity();

    tick(500);
    fixture.detectChanges();
    component.recuperarSenha();
    tick(500);

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      detail: 'recuperar_senha.descriptions.email_recuperacao_enviado',
    });
  }));

  it(`SHOULD show error message WHEN request password recovery failed`, fakeAsync(() => {
    spyOn(messageService, 'add').and.returnValue();
    spyOn(usuariosService, 'solicitarRecuperacaoSenha').and.returnValue(
      throwError(() => new Error())
    );

    fixture.detectChanges();
    const emailField = component.formGroup.get('email');

    emailField?.setValue('test@email.com');
    emailField?.markAsTouched();
    emailField?.updateValueAndValidity();

    tick(500);
    fixture.detectChanges();
    component.recuperarSenha();
    tick(500);

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      detail:
        'recuperar_senha.descriptions.nao_foi_possivel_solicitar_recuperacao_senha',
    });
  }));
});
