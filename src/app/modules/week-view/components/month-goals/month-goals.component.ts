import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { saveMonthInfoToDBAction } from '../../redux/goalsData.action';
import {
  getSaveErrorSelector,
  getSavedSelector,
  IGoalDataState,
} from '../../redux/goalsData.state';
import { DateTimeService } from '../../services/date-time/date-time.service';

@Component({
  selector: 'app-month-goals',
  templateUrl: './month-goals.component.html',
  styleUrls: ['./month-goals.component.scss'],
})
export class MonthGoalsComponent implements OnInit, OnDestroy {
  currentMonth: string;
  monthForm = this._formBuilder.group({
    motto: this._formBuilder.control('', [Validators.required]),
    goals: this._formBuilder.array([]),
  });

  get goals() {
    return this.monthForm.get('goals') as FormArray;
  }

  get goalsEmptyError() {
    return this.goals.length === 0;
  }

  saveError$: Observable<string | null>;
  dataSaved: Subscription;

  constructor(
    private _store: Store<IGoalDataState>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.currentMonth = DateTimeService.currentMonthName;
    this.saveError$ = this._store.select(getSaveErrorSelector);
    this.dataSaved = this._store.select(getSavedSelector).subscribe((val) => {
      if (val) {
        this._router.navigateByUrl('/month-info/week-targets');
        this._router.navigate(['../week-targets'], {
          relativeTo: this._activatedRoute,
        });
      }
    });
  }

  ngOnInit(): void {
    // 1. do not let this be loaded if month data is avalable.
    // 2. Create and reorder goals.
    // 3. Ability to save and publish
    // TODO:Done 4. Motto of month too.
  }

  ngOnDestroy() {
    if (this.dataSaved) {
      this.dataSaved.unsubscribe();
    }
  }

  onSubmit() {
    if (this.goals.length === 0) {
      return;
    }

    this._store.dispatch(saveMonthInfoToDBAction(this.monthForm.value));
  }
}
