import {
  Component,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PrimeIcons } from 'primeng/api';
import { TestingModule } from '../../tests/testing.module';

import { InputComponent } from './input.component';
import { InputModule } from './input.module';

@Component({
  selector: 'vhp-input-dummy',
  template: `
    <form [formGroup]="formGroup">
      <vhp-input formControlName="testInput"></vhp-input>
    </form>
  `,
})
class InputDummyComponent {
  formGroup!: FormGroup;

  @ViewChild(InputComponent, { static: true, read: InputComponent })
  inputComponent!: InputComponent;

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      testInput: [],
    });
  }
}

describe(InputComponent.name, () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  let componentDummy: InputDummyComponent;
  let fixtureDummy: ComponentFixture<InputDummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent, InputDummyComponent],
      imports: [InputModule, TestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    fixtureDummy = TestBed.createComponent(InputDummyComponent);
    componentDummy = fixtureDummy.componentInstance;

    fixture.detectChanges();
  });

  it('SHOULD create', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) SHOULD display label
  WHEN (@Input label) bound to property`, () => {
    component.label = 'test.label';
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('label'))
      ?.nativeElement as HTMLLabelElement;

    expect(labelEl.textContent).toBe('test.label');
  });

  it(`(D) SHOULD display sufix icon
  WHEN (@Input sufixIcon) bound to property`, () => {
    component.sufixIcon = PrimeIcons.AT;
    const changes = {
      sufixIcon: new SimpleChange(undefined, component.sufixIcon, false),
    } as SimpleChanges;
    component.ngOnChanges(changes);
    fixture.detectChanges();

    const iconEl = fixture.debugElement.query(By.css('.pi.pi-at'))
      ?.nativeElement as HTMLElement;
    expect(iconEl).toBeTruthy();
  });

  it(`(D) SHOULD display prefix icon
  WHEN (@Input prefixIcon) bound to property`, () => {
    component.prefixIcon = PrimeIcons.AT;
    const changes = {
      prefixIcon: new SimpleChange(undefined, component.prefixIcon, false),
    } as SimpleChanges;
    component.ngOnChanges(changes);
    fixture.detectChanges();

    const iconEl = fixture.debugElement.query(By.css('.pi.pi-at'))
      ?.nativeElement as HTMLElement;
    expect(iconEl).toBeTruthy();
  });

  it(`(D) SHOULD display prefix and sufix icon
  WHEN (@Input prefixIcon) and (@Input sufixIcon) bound to property`, () => {
    component.sufixIcon = PrimeIcons.ANDROID;
    component.prefixIcon = PrimeIcons.AT;
    const changes = {
      sufixIcon: new SimpleChange(undefined, component.sufixIcon, false),
      prefixIcon: new SimpleChange(undefined, component.prefixIcon, false),
    } as SimpleChanges;
    component.ngOnChanges(changes);
    fixture.detectChanges();

    const sufixEl = fixture.debugElement.query(By.css('.pi.pi-android'))
      ?.nativeElement as HTMLElement;
    const prefixEl = fixture.debugElement.query(By.css('.pi.pi-at'))
      ?.nativeElement as HTMLElement;
    expect(sufixEl).toBeTruthy();
    expect(prefixEl).toBeTruthy();
  });

  it(`(D) SHOULD stay untouched WHEN tab focus input`, () => {
    const inputComponent = componentDummy.inputComponent;
    const inputNativeElement = inputComponent.inputField.nativeElement;

    inputNativeElement.focus();
    fixtureDummy.detectChanges();

    expect(inputComponent.field?.touched).toBeFalse();
    expect(inputNativeElement.classList.contains('ng-untouched')).toBeTrue();
  });

  it(`(D) SHOULD have ng-untouched, ng-pristine and ng-valid classes WHEN initialize and have no validators`, () => {
    const inputComponent = componentDummy.inputComponent;
    const inputNativeElement = inputComponent.inputField.nativeElement;

    fixtureDummy.detectChanges();

    expect(inputNativeElement.classList.contains('ng-untouched'))
      .withContext('Class ng-untouched')
      .toBeTrue();

    expect(inputNativeElement.classList.contains('ng-pristine'))
      .withContext('Class ng-pristine')
      .toBeTrue();

    expect(inputNativeElement.classList.contains('ng-valid'))
      .withContext('Class ng-valid')
      .toBeTrue();
  });

  it(`(D) SHOULD have ng-touched and ng-dirty classes WHEN value is inserted`, fakeAsync(() => {
    fixtureDummy.detectChanges();
    const inputComponent = componentDummy.inputComponent;
    const inputNativeElement = inputComponent.inputField.nativeElement;
    const event = new InputEvent('input', {
      data: 'test',
      bubbles: true,
    });

    inputNativeElement.focus();
    inputNativeElement.value = 'test';
    inputNativeElement.dispatchEvent(event);
    inputNativeElement.blur();
    fixtureDummy.detectChanges();
    tick(500);
    fixtureDummy.detectChanges();

    expect(inputNativeElement.classList.contains('ng-touched'))
      .withContext('Class ng-touched')
      .toBeTrue();

    expect(inputNativeElement.classList.contains('ng-dirty'))
      .withContext('Class ng-dirty')
      .toBeTrue();
  }));
});
