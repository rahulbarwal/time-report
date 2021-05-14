import { TestBed } from '@angular/core/testing';

import { WeekTargetsGuard } from './week-targets.guard';

describe('WeekTargetsGuard', () => {
  let guard: WeekTargetsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WeekTargetsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
