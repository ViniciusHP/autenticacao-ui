import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

const FAKE_ID = 'TESTE_ID';

const FAKE_OBJECT = {
  description: 'Awesome test description',
};

describe(StorageService.name, () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${StorageService.prototype.saveObject.name} SHOULD save object ON local storage WHEN called.`, () => {
    service.saveObject(FAKE_ID, FAKE_OBJECT);
    expect(localStorage.getItem(FAKE_ID)).toEqual(JSON.stringify(FAKE_OBJECT));
  });

  it(`#${StorageService.prototype.getObject.name}
    SHOULD retrieve object saved by #${StorageService.prototype.saveObject.name}
    WHEN called with existing id.`, () => {
    service.saveObject(FAKE_ID, FAKE_OBJECT);
    expect(service.getObject(FAKE_ID)).toEqual(FAKE_OBJECT);
  });

  it(`#${StorageService.prototype.getObject.name}
    SHOULD return null
    WHEN not exist saved object for passed id.`, () => {
    expect(service.getObject(FAKE_ID)).toBeNull();
  });
});
