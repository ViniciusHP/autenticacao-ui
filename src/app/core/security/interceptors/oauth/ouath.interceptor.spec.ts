import { TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { environment } from 'src/environments/environment';
import { OauthAuthenticationService } from '../../services/oauth-authentication/oauth-authentication.service';
import { TokenService } from '../../services/token/token.service';
import { OuathInterceptor } from './ouath.interceptor';

const contextAPI = environment.apiUrl;

const REFRESH_TOKEN_URL = `${contextAPI}/oauth/refresh-token`;
const TOKEN_URL = `${contextAPI}/oauth/token`;
const REVOKE_URL = `${contextAPI}/oauth/revoke`;

const ASSETS_URL = '../../assets';
const ASSETS_URL_2 = './assets';

const USUARIO_URL_EMAIL_DISPONIVEL = `${contextAPI}/usuarios/email-disponivel`;
const USUARIO_URL_NOVO_USUARIO = `${contextAPI}/usuarios`;
const USUARIO_URL_RECUPERAR_SENHA = `${contextAPI}/usuarios/recuperar-senha`;
const USUARIO_URL_REDEFINIR_SENHA = `${contextAPI}/usuarios/redefinir-senha`;

const API_TEST_URL = 'http://localhost:4200/ouath-interceptor/test';

describe(OuathInterceptor.name, () => {
  let interceptor: OuathInterceptor;
  let service: OauthAuthenticationService;
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        OauthAuthenticationService,
        OuathInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OuathInterceptor,
          multi: true,
        },
        TokenService,
      ],
    });

    interceptor = TestBed.inject(OuathInterceptor);
    service = TestBed.inject(OauthAuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('SHOULD be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('SHOULD do request WHEN user is logged in.', (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(true);

    http.get(API_TEST_URL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(API_TEST_URL).flush({});
    httpMock.expectNone(REFRESH_TOKEN_URL);
  });

  it('SHOULD do request WHEN refresh token is valid.', (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication').and.returnValue(of('Vinicius'));

    http.get(API_TEST_URL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(API_TEST_URL).flush({});
  });

  it('SHOULD redirect to login WHEN refresh token is invalid.', (done) => {
    const responseError = new HttpErrorResponse({ status: 400 });

    spyOn(router, 'navigate').and.callFake(
      (commands, _) => new Promise(() => true)
    );
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication').and.returnValue(
      throwError(() => responseError)
    );

    http.get(API_TEST_URL).subscribe({
      error: () => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      },
    });

    httpMock.expectNone(API_TEST_URL);
  });

  it(`SHOULD do request WHEN token url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(TOKEN_URL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(TOKEN_URL).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN refresh token url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(REFRESH_TOKEN_URL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(REFRESH_TOKEN_URL).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN revoke url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(REVOKE_URL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(REVOKE_URL).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN assets url '../../assets'.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(ASSETS_URL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(ASSETS_URL).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN assets url './assets'.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(ASSETS_URL_2).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(ASSETS_URL_2).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN email disponivel url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(USUARIO_URL_EMAIL_DISPONIVEL).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(USUARIO_URL_EMAIL_DISPONIVEL).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN novo usuario url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(USUARIO_URL_NOVO_USUARIO).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(USUARIO_URL_NOVO_USUARIO).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN recuperar senha url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(USUARIO_URL_RECUPERAR_SENHA).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(USUARIO_URL_RECUPERAR_SENHA).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });

  it(`SHOULD do request WHEN redefinir senha url.`, (done) => {
    spyOn(service, 'isUsuarioLogado').and.returnValue(false);
    spyOn(service, 'tryRefreshAuthentication');

    http.get(USUARIO_URL_REDEFINIR_SENHA).subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(USUARIO_URL_REDEFINIR_SENHA).flush({});
    expect(service.tryRefreshAuthentication).not.toHaveBeenCalled();
  });
});
