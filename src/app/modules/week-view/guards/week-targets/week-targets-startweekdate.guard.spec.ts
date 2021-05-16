import { TestBed } from '@angular/core/testing';

import { WeekTargetStartWeekDateGuard } from './week-targets-startweekdate.guard';

describe('WeekTargetsGuard', () => {
  let guard: WeekTargetStartWeekDateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WeekTargetStartWeekDateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
