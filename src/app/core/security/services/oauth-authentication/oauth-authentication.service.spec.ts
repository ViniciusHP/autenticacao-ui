import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

import { OauthAuthenticationService } from './oauth-authentication.service';

const contextAPI = environment.apiUrl;

const fakeAcessToken = {
  tipo: 'Bearer',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJhdWQiOiJDYXJ0ZWlyYS5BUEkiLCJzdWIiOiJiYjkxMjhlYi1iMDUzLTQ3YTktOTc0ZS1kZGJmODBlOTViYzIiLCJuYW1lIjoiU2lyaXVzIiwiaWF0IjoxNjc1MDE1NTQzLCJleHAiOjE2NzUwMTU1NTN9.big0hcihYJKnB8z6QmTConzj3mCHemOmDKz2qzGxS7g',
};

const FAKE_USERNAME = 'Sirius';
const REFRESH_TOKEN_URL = `${contextAPI}/oauth/refresh-token`;
const TOKEN_URL = `${contextAPI}/oauth/token`;
const REVOKE_URL = `${contextAPI}/oauth/revoke`;

describe(OauthAuthenticationService.name, () => {
  let service: OauthAuthenticationService;
  let httpMock: HttpTestingController;
  let storageService: StorageService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [TokenService],
    });
    service = TestBed.inject(OauthAuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
    tokenService = TestBed.inject(TokenService);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${OauthAuthenticationService.prototype.authenticate.name}
  SHOULD do login 
  AND save access token 
  WHEN called.`, (done) => {
    spyOn(storageService, 'saveObject').and.callFake(() => null);
    service.authenticate('email@email.com', '12345').subscribe((username) => {
      expect(username).toBe(FAKE_USERNAME);
      expect(storageService.saveObject).toHaveBeenCalledWith(
        'ACCESS_TOKEN',
        fakeAcessToken
      );
      done();
    });

    httpMock.expectOne(TOKEN_URL).flush(fakeAcessToken);
  });

  it(`#${OauthAuthenticationService.prototype.tryRefreshAuthentication.name}
  SHOULD try refresh login
  AND save access token
  WHEN called.`, (done) => {
    spyOn(storageService, 'saveObject').and.callFake(() => null);
    service.tryRefreshAuthentication().subscribe((username) => {
      expect(username).toBe(FAKE_USERNAME);
      expect(storageService.saveObject).toHaveBeenCalledWith(
        'ACCESS_TOKEN',
        fakeAcessToken
      );
      done();
    });

    httpMock.expectOne(REFRESH_TOKEN_URL).flush(fakeAcessToken);
  });

  it(`#${OauthAuthenticationService.prototype.tryRefreshAuthentication.name}
  SHOULD append authorization header
  WHEN has access token.`, (done) => {
    spyOn(tokenService, 'getAuthorizationHeader').and.returnValue(
      `Bearer fake-token-value`
    );
    spyOn(storageService, 'saveObject').and.callFake(() => null);
    service.tryRefreshAuthentication().subscribe((username) => {
      expect(username).toBe(FAKE_USERNAME);
      expect(storageService.saveObject).toHaveBeenCalledWith(
        'ACCESS_TOKEN',
        fakeAcessToken
      );
      done();
    });

    httpMock
      .expectOne(
        (req) =>
          req.url === REFRESH_TOKEN_URL && !!req.headers.get('Authorization')
      )
      .flush(fakeAcessToken);
  });

  it(`#${OauthAuthenticationService.prototype.logout.name}
  SHOULD logout
  WHEN called.`, (done) => {
    service.logout().subscribe(() => {
      expect().nothing();
      done();
    });

    httpMock.expectOne(REVOKE_URL).flush(fakeAcessToken);
  });

  it(`#${OauthAuthenticationService.prototype.getUsername.name} SHOULD return username WHEN called`, () => {
    spyOn(tokenService, 'getUsername').and.returnValue('Sirius');

    expect(service.getUsername()).toBe('Sirius');
  });
});
