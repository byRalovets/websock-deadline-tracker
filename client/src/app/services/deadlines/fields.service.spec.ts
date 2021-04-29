import { TestBed } from '@angular/core/testing';

import { FieldsService } from './fields.service';

describe('UserService', () => {
  let service: FieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
