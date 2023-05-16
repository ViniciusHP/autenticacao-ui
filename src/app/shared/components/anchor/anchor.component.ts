import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'vhp-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorComponent implements OnChanges {
  @Input()
  public link!: string;

  @Input()
  public type: 'text' | 'button' = 'text';

  public isButton: boolean = false;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('type' in changes) {
      this._handleTypeChange(changes['type'].currentValue);
    }
  }

  /**
   * Trata alteração do tipo.
   *
   * @param type - Tipo de componente.
   */
  private _handleTypeChange(type: string): void {
    this.isButton = this._isButtonType(type);
  }

  /**
   * Verifica se o tipo é botão.
   *
   * @param type - Tipo a ser verificado.
   * @returns true se o tipo for botão, senão, false.
   */
  private _isButtonType(type: string) {
    return type === 'button';
  }
}
