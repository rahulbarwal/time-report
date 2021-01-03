import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTargetsComponent } from './week-targets.component';

describe('WeekTargetsComponent', () => {
  let component: WeekTargetsComponent;
  let fixture: ComponentFixture<WeekTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekTargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
