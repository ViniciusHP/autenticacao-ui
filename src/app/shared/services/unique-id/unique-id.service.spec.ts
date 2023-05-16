import { TestBed } from '@angular/core/testing';

import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {
  let service: UniqueIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueIdService);
  });

  it('SHOULD be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
  SHOULD return the number of generatedIds
  WHEN called`, () => {
    service.generateUniqueIdWithPrefix('test');
    service.generateUniqueIdWithPrefix('test');
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  SHOULD generate unique id with prefix
  WHEN called with prefix`, () => {
    const uniqueId = service.generateUniqueIdWithPrefix('test');
    expect(uniqueId.startsWith('test-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  SHOULD not generate duplicate IDs 
  WHEN called multiple times`, () => {
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('test'));
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  SHOULD throw error
  WHEN called with empty`, () => {
    const emptyValues = [undefined, null, '', 0, '0'];
    emptyValues.forEach((emptyValue: any) => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow();
    });
  });
});
