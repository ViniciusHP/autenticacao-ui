import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ValidationsService } from './validations.service';

describe(ValidationsService.name, () => {
  let service: ValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationsService);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${ValidationsService.prototype.confirmPassword} validator
  SHOULD trigger 'confirmacaoSenha' error
  WHEN applied to form control
  AND current form control has different value
  from form control passed to #${ValidationsService.prototype.confirmPassword}`, fakeAsync(() => {
    const passwordField = new FormControl({ value: '', disabled: false });
    const confirmPasswordField = new FormControl(
      { value: '', disabled: false },
      [service.confirmPassword(() => passwordField)]
    );
    passwordField.setValue('TestValue');
    passwordField.markAsTouched();
    passwordField.updateValueAndValidity();

    confirmPasswordField.setValue('ValueTest');
    confirmPasswordField.markAsTouched();
    confirmPasswordField.updateValueAndValidity();

    tick(200);

    expect(confirmPasswordField.hasError('confirmacaoSenha')).toBeTrue();
  }));

  it(`#${ValidationsService.prototype.confirmPassword} validator
  SHOULD not trigger 'confirmacaoSenha' error
  WHEN applied to form control
  AND current form control has same value
  from form control passed to #${ValidationsService.prototype.confirmPassword}`, fakeAsync(() => {
    const passwordField = new FormControl({ value: '', disabled: false });
    const confirmPasswordField = new FormControl(
      { value: '', disabled: false },
      [service.confirmPassword(() => passwordField)]
    );
    passwordField.setValue('TestValue');
    passwordField.markAsTouched();
    passwordField.updateValueAndValidity();

    confirmPasswordField.setValue('TestValue');
    confirmPasswordField.markAsTouched();
    confirmPasswordField.updateValueAndValidity();

    tick(200);

    expect(confirmPasswordField.hasError('confirmacaoSenha')).toBeFalse();
  }));
});
