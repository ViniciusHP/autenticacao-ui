import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { environment } from 'src/environments/environment';

import { UsuariosService } from './usuarios.service';

const contextAPI = environment.apiUrl;
const NEW_USER_URL = `${contextAPI}/usuarios`;
const FORGOT_PASSWORD_URL = `${contextAPI}/usuarios/recuperar-senha`;
const REDEFINE_PASSWORD_URL = `${contextAPI}/usuarios/redefinir-senha`;
const EMAIL_AVALIABLE_URL = `${contextAPI}/usuarios/email-disponivel`;

describe(UsuariosService.name, () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    });
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${UsuariosService.prototype.isEmailDisponivel.name}
  SHOULD do request WHEN called`, (done) => {
    service.isEmailDisponivel('email@email.com').subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock
      .expectOne((req) => {
        return (
          req.url === EMAIL_AVALIABLE_URL &&
          req.params.get('email') === 'email@email.com'
        );
      })
      .flush({});
  });

  it(`#${UsuariosService.prototype.novoUsuario.name}
  SHOULD do request WHEN called`, (done) => {
    const novoUsuario = {
      name: 'Test',
      password: '12345',
      confirmPassword: '12345',
      email: 'email@email.com',
    };

    service.novoUsuario(novoUsuario).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock
      .expectOne((req) => {
        return req.url === NEW_USER_URL && req.body === novoUsuario;
      })
      .flush({});
  });

  it(`#${UsuariosService.prototype.solicitarRecuperacaoSenha.name}
  SHOULD do request WHEN called`, (done) => {
    service.solicitarRecuperacaoSenha('email@email.com').subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock
      .expectOne((req) => {
        return (
          req.url === FORGOT_PASSWORD_URL &&
          req.body.email === 'email@email.com'
        );
      })
      .flush({});
  });

  it(`#${UsuariosService.prototype.redefinirSenha.name}
  SHOULD do request WHEN called`, (done) => {
    service
      .redefinirSenha('12345', 'wkadnka9ijaw89u2uj8kmawd')
      .subscribe(() => {
        expect().nothing();
        done();
      });

    httpMock
      .expectOne((req) => {
        return (
          req.url === REDEFINE_PASSWORD_URL &&
          req.body.password === '12345' &&
          req.body.token === 'wkadnka9ijaw89u2uj8kmawd'
        );
      })
      .flush({});
  });
});
