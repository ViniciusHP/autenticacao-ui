import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { RedirectAfterLoginService } from 'src/app/core/services/redirect-after-login/redirect-after-login.service';
import { TestingModule } from 'src/app/shared/tests/testing.module';
import { OauthAuthenticationService } from '../../services/oauth-authentication/oauth-authentication.service';

import { Route } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';

const FAKE_ROUTE = {
  path: 'test-route',
} as Route;

const FAKE_URL_SEGMENT = [
  {
    path: 'test-route',
  },
] as UrlSegment[];

const FAKE_ROUTE_SNAPSHOT = {
  url: '/teste',
} as RouterStateSnapshot;

const FAKE_ACTIVAED_ROUTE = {} as ActivatedRouteSnapshot;

describe(AuthenticationGuard.name, () => {
  let guard: AuthenticationGuard;
  let oauthAuthenticationService: OauthAuthenticationService;
  let router: Router;
  let redirectAfterLoginService: RedirectAfterLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    });
    guard = TestBed.inject(AuthenticationGuard);
    oauthAuthenticationService = TestBed.inject(OauthAuthenticationService);
    router = TestBed.inject(Router);
    redirectAfterLoginService = TestBed.inject(RedirectAfterLoginService);
  });

  it('SHOULD be created', () => {
    expect(guard).toBeTruthy();
  });

  it(`${AuthenticationGuard.prototype.canActivate.name} SHOULD navigate WHEN user logged in`, () => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(true);

    expect(
      guard.canActivate(FAKE_ACTIVAED_ROUTE, FAKE_ROUTE_SNAPSHOT)
    ).toBeTrue();
  });

  it(`${AuthenticationGuard.prototype.canActivate.name} SHOULD navigate WHEN refresh token is valid`, (done) => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(false);
    spyOn(
      oauthAuthenticationService,
      'tryRefreshAuthentication'
    ).and.returnValue(of('Vinicius'));

    const observable = guard.canActivate(
      FAKE_ACTIVAED_ROUTE,
      FAKE_ROUTE_SNAPSHOT
    ) as Observable<boolean>;

    observable?.subscribe((navigation) => {
      expect(navigation).toBeTrue();
      done();
    });
  });

  it(`${AuthenticationGuard.prototype.canActivate.name} SHOULD redirect to login page WHEN refresh token is expired`, (done) => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(false);
    spyOn(
      oauthAuthenticationService,
      'tryRefreshAuthentication'
    ).and.returnValue(throwError(() => new Error()));

    spyOn(router, 'navigate').and.callFake(
      (commands, _) => new Promise(() => true)
    );

    const observable = guard.canActivate(
      FAKE_ACTIVAED_ROUTE,
      FAKE_ROUTE_SNAPSHOT
    ) as Observable<boolean>;

    observable?.subscribe((navigation) => {
      expect(navigation).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it(`${AuthenticationGuard.prototype.canActivate.name} SHOULD save page URL WHEN refresh token is expired`, (done) => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(false);
    spyOn(
      oauthAuthenticationService,
      'tryRefreshAuthentication'
    ).and.returnValue(throwError(() => new Error()));

    spyOn(router, 'navigate').and.callFake(
      (commands, _) => new Promise(() => true)
    );

    spyOn(redirectAfterLoginService, 'setUrl');

    const observable = guard.canActivate(
      FAKE_ACTIVAED_ROUTE,
      FAKE_ROUTE_SNAPSHOT
    ) as Observable<boolean>;

    observable?.subscribe((navigation) => {
      expect(navigation).toBeFalse();
      expect(redirectAfterLoginService.setUrl).toHaveBeenCalledWith(
        FAKE_ROUTE_SNAPSHOT.url
      );
      done();
    });
  });

  it(`${AuthenticationGuard.prototype.canLoad.name} SHOULD navigate WHEN user logged in`, () => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(true);

    expect(guard.canLoad(FAKE_ROUTE, FAKE_URL_SEGMENT)).toBeTrue();
  });

  it(`${AuthenticationGuard.prototype.canLoad.name} SHOULD navigate WHEN refresh token is valid`, (done) => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(false);
    spyOn(
      oauthAuthenticationService,
      'tryRefreshAuthentication'
    ).and.returnValue(of('Vinicius'));

    const observable = guard.canLoad(
      FAKE_ROUTE,
      FAKE_URL_SEGMENT
    ) as Observable<boolean>;

    observable?.subscribe((navigation) => {
      expect(navigation).toBeTrue();
      done();
    });
  });

  it(`${AuthenticationGuard.prototype.canLoad.name} SHOULD redirect to login page WHEN refresh token is expired`, (done) => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(false);
    spyOn(
      oauthAuthenticationService,
      'tryRefreshAuthentication'
    ).and.returnValue(throwError(() => new Error()));

    spyOn(router, 'navigate').and.callFake(
      (commands, _) => new Promise(() => true)
    );

    const observable = guard.canLoad(
      FAKE_ROUTE,
      FAKE_URL_SEGMENT
    ) as Observable<boolean>;

    observable?.subscribe((navigation) => {
      expect(navigation).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it(`${AuthenticationGuard.prototype.canLoad.name} SHOULD save page URL WHEN refresh token is expired`, (done) => {
    spyOn(oauthAuthenticationService, 'isUsuarioLogado').and.returnValue(false);
    spyOn(
      oauthAuthenticationService,
      'tryRefreshAuthentication'
    ).and.returnValue(throwError(() => new Error()));

    spyOn(router, 'navigate').and.callFake(
      (commands, _) => new Promise(() => true)
    );

    spyOn(redirectAfterLoginService, 'setUrl');

    const observable = guard.canLoad(
      FAKE_ROUTE,
      FAKE_URL_SEGMENT
    ) as Observable<boolean>;

    observable?.subscribe((navigation) => {
      expect(navigation).toBeFalse();
      expect(redirectAfterLoginService.setUrl).toHaveBeenCalledWith(
        FAKE_ROUTE.path as string
      );
      done();
    });
  });
});
