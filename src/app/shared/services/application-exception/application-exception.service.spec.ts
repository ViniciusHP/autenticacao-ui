import { TestBed } from '@angular/core/testing';
import { TestingModule } from '../../tests/testing.module';

import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationExceptionMessages } from '../../model/application-exception-message.model';
import { ApplicationExceptionService } from './application-exception.service';

describe(ApplicationExceptionService.name, () => {
  let service: ApplicationExceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    });
    service = TestBed.inject(ApplicationExceptionService);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${ApplicationExceptionService.prototype.isApplicationException.name}
  SHOULD return false WHEN called with null parameter.`, () => {
    expect(service.isApplicationException(null)).toBeFalse();
  });

  it(`#${ApplicationExceptionService.prototype.isApplicationException.name}
  SHOULD return false WHEN called with error object parameter.`, () => {
    expect(service.isApplicationException(new Error())).toBeFalse();
  });

  it(`#${ApplicationExceptionService.prototype.isApplicationException.name}
  SHOULD return true WHEN called with array of application exceptions.`, () => {
    const error = [
      {
        message: 'Test message',
      },
    ] as ApplicationExceptionMessages;

    expect(service.isApplicationException(error)).toBeTrue();
  });

  it(`#${ApplicationExceptionService.prototype.getApplicationExceptionsMessages.name}
  SHOULD return default messagem WHEN called with an error that is not an application exception.`, () => {
    const error = new HttpErrorResponse({});
    const defaultMessage = 'This is a default message test.';

    expect(
      service.getApplicationExceptionsMessages(error, defaultMessage)
    ).toEqual(defaultMessage);
  });

  it(`#${ApplicationExceptionService.prototype.getApplicationExceptionsMessages.name}
  SHOULD return all error messages WHEN called with application exceptions array.`, () => {
    const error = new HttpErrorResponse({
      error: [
        {
          message: 'Test message #1',
        },
        {
          message: 'Test message #2',
        },
      ] as ApplicationExceptionMessages,
    });

    const defaultMessage = 'This is a default message test.';

    expect(
      service.getApplicationExceptionsMessages(error, defaultMessage)
    ).toEqual('Test message #1. Test message #2.');
  });
});
