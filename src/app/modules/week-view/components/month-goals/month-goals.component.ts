import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IGoalDataState } from '../../redux/state/goalsData.state';
import { DateTimeService } from '../../services/date-time/date-time.service';

@Component({
  selector: 'app-month-goals',
  templateUrl: './month-goals.component.html',
  styleUrls: ['./month-goals.component.scss'],
})
export class MonthGoalsComponent implements OnInit {
  currentMonth: string;
  monthForm = this._formBuilder.group({
    motto: this._formBuilder.control('', [Validators.required]),
    goals: this._formBuilder.array([]),
  });

  get goals() {
    return this.monthForm.get('goals') as FormArray;
  }

  constructor(
    private _dateTime: DateTimeService,
    private _store: Store<IGoalDataState>,
    private _formBuilder: FormBuilder
  ) {
    this.currentMonth = this._dateTime.currentMonthName;
  }

  ngOnInit(): void {
    // 1. do not let this be loaded if month data is avalable.
    // 2. Create and reorder goals.
    // 3. Ability to save and publish
    // 4. Motto of month too.
  }
}
