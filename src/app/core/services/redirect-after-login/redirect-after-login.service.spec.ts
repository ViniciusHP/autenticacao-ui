import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RedirectAfterLoginService } from './redirect-after-login.service';

describe(RedirectAfterLoginService.name, () => {
  let service: RedirectAfterLoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectAfterLoginService);
    router = TestBed.inject(Router);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${RedirectAfterLoginService.prototype.redirectToPageAccessedBeforeLogin.name}
  SHOULD navigate to URL passed to #${RedirectAfterLoginService.prototype.setUrl.name} WHEN called.`, () => {
    spyOn(router, 'navigateByUrl').and.callFake(() => new Promise(() => true));
    service.setUrl('/redirect-after-login-test');
    service.redirectToPageAccessedBeforeLogin();

    expect(router.navigateByUrl).toHaveBeenCalledWith(
      '/redirect-after-login-test'
    );
  });

  it(`#${RedirectAfterLoginService.prototype.redirectToPageAccessedBeforeLogin.name}
  SHOULD navigate to '' WHEN called without #${RedirectAfterLoginService.prototype.setUrl.name}.`, () => {
    spyOn(router, 'navigateByUrl').and.callFake(() => new Promise(() => true));
    service.redirectToPageAccessedBeforeLogin();

    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  });
});
