import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthGoalsComponent } from './month-goals.component';

describe('MonthGoalsComponent', () => {
  let component: MonthGoalsComponent;
  let fixture: ComponentFixture<MonthGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
