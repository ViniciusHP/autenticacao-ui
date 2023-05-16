import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrimeIcons } from 'primeng/api';
import { TestingModule } from '../../tests/testing.module';

import { InputPasswordComponent } from './input-password.component';
import { InputPasswordModule } from './input-password.module';

describe(InputPasswordComponent.name, () => {
  let component: InputPasswordComponent;
  let fixture: ComponentFixture<InputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPasswordComponent],
      imports: [InputPasswordModule, TestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
});
