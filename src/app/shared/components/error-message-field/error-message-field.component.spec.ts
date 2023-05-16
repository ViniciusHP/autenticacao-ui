import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TestingModule } from '../../tests/testing.module';

import { ErrorMessageFieldComponent } from './error-message-field.component';
import { ErrorMessageFieldModule } from './error-message-field.module';
import { MessageValidation } from './model/message-validation.model';

describe(ErrorMessageFieldComponent.name, () => {
  let component: ErrorMessageFieldTestComponent;
  let fixture: ComponentFixture<ErrorMessageFieldTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageFieldTestComponent],
      imports: [ErrorMessageFieldModule, ReactiveFormsModule, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageFieldTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`SHOULD create`, () => {
    expect(component).toBeTruthy();
  });

  it(`SHOULD show error message 
  WHEN field has validation error.`, fakeAsync(() => {
    const mensagemValidacao = 'Mensagem de validação';
    component.messages = [
      {
        validationName: 'required',
        validationMessage: mensagemValidacao,
      },
    ];

    const field = component.field;

    field.setValidators(Validators.required);
    field.markAsTouched();
    field.markAsDirty();
    field.setValue(null);

    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    const mensagemEl: HTMLElement = fixture.nativeElement.querySelector(
      '.error-message-field'
    );

    expect(mensagemEl?.textContent?.trim()).toBe(mensagemValidacao);
  }));

  it(`SHOULD hide errors messages 
  WHEN field has no validation error.`, fakeAsync(() => {
    const mensagemValidacao = 'Mensagem de validação';
    component.messages = [
      {
        validationName: 'required',
        validationMessage: mensagemValidacao,
      },
    ];

    const field = component.field;

    field.setValidators(Validators.required);
    field.markAsTouched();
    field.markAsDirty();
    field.setValue('Teste');

    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    const mensagensErro: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.error-message-field'
    );
    expect(mensagensErro.length).toBe(0);
  }));
});

@Component({
  template: `<form [formGroup]="formGroup">
    <input formControlName="campo" type="text" #formField />
    <vhp-error-message-field
      [field]="field"
      [messages]="messages"
    ></vhp-error-message-field>
  </form>`,
})
class ErrorMessageFieldTestComponent implements OnInit {
  @ViewChild(ErrorMessageFieldComponent)
  public errorMessageFieldCamponent!: ErrorMessageFieldComponent;
  public formGroup!: FormGroup;
  public field!: AbstractControl;
  public messages: MessageValidation[] = [];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      campo: [null],
    });

    this.field = this.formGroup.get('campo') as AbstractControl;
  }
}
