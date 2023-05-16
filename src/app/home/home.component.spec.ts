import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, throwError } from 'rxjs';
import { OauthAuthenticationService } from '../core/security/services/oauth-authentication/oauth-authentication.service';
import { TestingModule } from '../shared/tests/testing.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationService: OauthAuthenticationService;
  let router: Router;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(OauthAuthenticationService);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`(D) SHOULD show username WHEN load`, () => {
    spyOn(authenticationService, 'getUsername').and.returnValue('Vinicius');

    fixture.detectChanges();

    const pElement = fixture.debugElement.query(By.css('.home__descricao > p'))
      .nativeElement as HTMLParagraphElement;

    expect(component.username).toBe('Vinicius');
    expect(
      pElement.textContent?.includes('home.descriptions.seja_bem_vindo')
    ).toBeTrue();
  });

  it(`(D) #${HomeComponent.prototype.sair.name} SHOULD logout WHEN called`, (done) => {
    spyOn(authenticationService, 'logout').and.returnValue(
      new BehaviorSubject<void>(undefined).asObservable()
    );

    spyOn(router, 'navigate').and.callFake((commands, extras) => {
      expect(component.isLoadingSubject.next).toHaveBeenCalledWith(true);
      expect(authenticationService.logout).toHaveBeenCalled();
      expect(commands).toEqual(['/login']);
      done();

      return new Promise(() => true);
    });

    fixture.detectChanges();

    spyOn(component.isLoadingSubject, 'next');

    const button = fixture.debugElement.query(By.css('button[type="button"]'))
      .nativeElement as HTMLButtonElement;

    button.click();
  });

  it(`(D) #${HomeComponent.prototype.sair.name} SHOULD show error message WHEN failed to logout`, (done) => {
    spyOn(authenticationService, 'logout').and.returnValue(
      throwError(() => new Error())
    );

    spyOn(messageService, 'add').and.callFake((message) => {
      expect(component.isLoadingSubject.next).toHaveBeenCalledWith(true);
      expect(authenticationService.logout).toHaveBeenCalled();
      expect(message.severity).toBe('error');
      expect(message.detail).toBe('home.descriptions.ocorreu_erro_deslogar');
      done();
    });

    fixture.detectChanges();
    spyOn(component.isLoadingSubject, 'next');

    const button = fixture.debugElement.query(By.css('button[type="button"]'))
      .nativeElement as HTMLButtonElement;

    button.click();
  });
});
