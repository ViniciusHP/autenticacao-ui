import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { OauthAuthenticationService } from '../core/security/services/oauth-authentication/oauth-authentication.service';
import { fadeAndSlide } from '../shared/animations/fade-and-slide.animation';

@Component({
  selector: 'vhp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAndSlide],
})
export class HomeComponent implements OnInit {
  public isLoadingSubject!: BehaviorSubject<boolean>;
  public $isLoading!: Observable<boolean>;
  public username!: string | null;

  constructor(
    private _oauthAuthentication: OauthAuthenticationService,
    private _router: Router,
    private _message: MessageService,
    private _translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.$isLoading = this.isLoadingSubject.asObservable();
    this.username = this._oauthAuthentication.getUsername();
  }

  /**
   * Executa a finalização de sessão do usuário
   */
  public sair(): void {
    this.setLoading(true);
    this._oauthAuthentication
      .logout()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: () => this._router.navigate(['/login']),
        error: (err) => this._error(err),
      });
  }

  /**
   * Altera estado de carregamento da página.
   *
   * @param isLoading - Indica se a página está carregando ou não.
   */
  public setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }

  /**
   * Exibe mensagem de erro.
   *
   * @param res - Resposta de erro da requisição de finalização de sessão do usuário.
   */
  private _error(res: HttpErrorResponse) {
    this._message.add({
      severity: 'error',
      detail: this._translate.instant(
        'home.descriptions.ocorreu_erro_deslogar'
      ),
    });
  }
}
