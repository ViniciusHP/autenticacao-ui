import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _primengConfig: PrimeNGConfig,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    this._configuraRipple();
    this._configureTranslate();
  }

  private _configuraRipple(): void {
    this._primengConfig.ripple = true;
  }

  private _configureTranslate(): void {
    this._translate.addLangs(['en', 'pt']);
    this._translate.setDefaultLang('pt');

    const browserLang = this._translate.getBrowserLang();

    this._translate.use(browserLang?.match(/en|pt/) ? browserLang : 'pt');
  }
}
