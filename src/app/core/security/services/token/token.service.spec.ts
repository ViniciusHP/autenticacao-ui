import { TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/shared/tests/testing.module';

import { TokenService } from './token.service';

const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJhdWQiOiJDYXJ0ZWlyYS5BUEkiLCJzdWIiOiJiYjkxMjhlYi1iMDUzLTQ3YTktOTc0ZS1kZGJmODBlOTViYzIiLCJuYW1lIjoiU2lyaXVzIiwiaWF0IjoxNjc1MDE1NTQzLCJleHAiOjE2NzUwMTU1NTN9.big0hcihYJKnB8z6QmTConzj3mCHemOmDKz2qzGxS7g';

describe(TokenService.name, () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    });
    service = TestBed.inject(TokenService);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${TokenService.prototype.isExpiredToken.name} SHOULD return false WHEN token isn't expired`, () => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    spyOn(service, 'getDateExpiration').and.returnValue(tomorrow);

    expect(service.isExpiredToken(FAKE_TOKEN)).toBeFalse();
  });

  it(`#${TokenService.prototype.getDateExpiration.name} SHOULD return null WHEN invalid token`, () => {
    expect(service.getDateExpiration('')).toBeNull();
  });

  it(`#${TokenService.prototype.isExpiredToken.name} SHOULD return true WHEN token is expired`, () => {
    expect(service.isExpiredToken(FAKE_TOKEN)).toBeTrue();
  });

  it(`#${TokenService.prototype.isExpiredToken.name} SHOULD return true WHEN token is invalid`, () => {
    expect(service.isExpiredToken('')).toBeTrue();
  });

  it(`#${TokenService.prototype.isExpiredToken.name} SHOULD return true WHEN token blank`, () => {
    expect(service.isExpiredToken('')).toBeTrue();
  });

  it(`#${TokenService.prototype.getPayload.name} SHOULD return payload WHEN valid token`, () => {
    expect(service.getPayload(FAKE_TOKEN)).toBeTruthy();
  });

  it(`#${TokenService.prototype.getPayload.name} SHOULD return null WHEN invalid token`, () => {
    expect(service.getPayload('invalidToken')).toBeNull();
  });

  it(`#${TokenService.prototype.getUsername.name} SHOULD return username WHEN valid token`, () => {
    expect(service.getUsername(FAKE_TOKEN)).toBe('Sirius');
  });

  it(`#${TokenService.prototype.getUsername.name} SHOULD return null WHEN invalid token`, () => {
    expect(service.getUsername('')).toBeNull();
  });

  it(`#${TokenService.prototype.getAuthorizationHeader.name}
  SHOULD return authentication header WHEN valid access token`, () => {
    const header = service.getAuthorizationHeader('Bearer', FAKE_TOKEN);
    expect(header).toBe(`Bearer ${FAKE_TOKEN}`);
  });

  it(`#${TokenService.prototype.getAuthorizationHeader.name}
  SHOULD return null WHEN invalid type`, () => {
    expect(service.getAuthorizationHeader('', FAKE_TOKEN)).toBeNull();
  });

  it(`#${TokenService.prototype.getAuthorizationHeader.name}
  SHOULD return null WHEN invalid token`, () => {
    expect(service.getAuthorizationHeader('Bearer', 'invalidToken')).toBeNull();
  });

  it(`#${TokenService.prototype.isValidToken.name}
  SHOULD return true WHEN valid token`, () => {
    expect(service.isValidToken(FAKE_TOKEN)).toBeTrue();
  });

  it(`#${TokenService.prototype.isValidToken.name}
  SHOULD return false WHEN invalid token`, () => {
    expect(service.isValidToken('invalid-token')).toBeFalse();
  });
});
