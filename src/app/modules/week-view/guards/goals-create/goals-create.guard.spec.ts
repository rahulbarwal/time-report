import { TestBed } from '@angular/core/testing';

import { GoalsCreateGuard } from './goals-create.guard';

describe('GoalsCreateGuard', () => {
  let guard: GoalsCreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GoalsCreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
