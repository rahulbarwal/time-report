import { TestBed } from '@angular/core/testing';

import { TargetsDbService } from './targets-db.service';

describe('TargetsDbService', () => {
  let service: TargetsDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetsDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
