import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'vhp-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent {
  @ContentChild('illustrationTemplate')
  public illustrationTemplate!: TemplateRef<any>;

  @ContentChild('formTemplate')
  public formTemplate!: TemplateRef<any>;
}
