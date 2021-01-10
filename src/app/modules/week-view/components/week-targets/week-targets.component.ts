import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  loadMonthInfoToFromDBAction,
  updateGoalHrsForTodayAction,
} from '../../redux/actions/goalsData.action';
import {
  getDataLoadingSelector,
  getMonthsMapSelector,
  IGoalDataState,
  IMonthInfo,
} from '../../redux/state/goalsData.state';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';

@Component({
  selector: 'app-week-targets',
  templateUrl: './week-targets.component.html',
  styleUrls: ['./week-targets.component.scss'],
})
export class WeekTargetsComponent implements OnInit {
  loading$!: Observable<boolean>;
  monthInfo$!: Observable<IMonthInfo | null | undefined>;
  currentMonth!: string;
  weekTitles!: string[];
  weekDates!: (number | null)[];
  currentDayIndex!: number;

  constructor(
    private store: Store<IGoalDataState>,
    private _dateService: DateTimeService,
    private _targetDB: TargetsDbService
  ) {
    this.currentMonth = this._dateService.currentMonthName;
    this.weekDates = this._dateService.getValidWeekDaysList();
    this.weekTitles = this.initializeWeekTitles();
    this.currentDayIndex = this.weekDates.findIndex(
      (date) => date === this._dateService.today.getDate()
    );

    this.dispatchLoadMonthInfo();
  }

  dispatchLoadMonthInfo(setLoading = true) {
    this.store.dispatch(
      loadMonthInfoToFromDBAction({
        year: this._dateService.currentYear,
        month: this.currentMonth,
        loading: setLoading,
        weekDates: this.weekDates,
      })
    );
  }

  initializeWeekTitles(): string[] {
    const monthShort = this.currentMonth.substring(0, 3);
    return [
      'Goals',
      ...this.weekDates.map((date) => (date ? `${date} ${monthShort}` : '')),
    ];
  }

  ngOnInit(): void {
    this.monthInfo$ = this.store.select(getMonthsMapSelector).pipe(
      map((months) => {
        return months.get(this.currentMonth);
      })
    );
    this.loading$ = this.store.select(getDataLoadingSelector);
  }

  async setHoursForGoal({
    goalID,
    dayIndex,
    hrs,
  }: {
    goalID: string;
    dayIndex: number;
    hrs: number;
  }) {
    await this._targetDB.updateGoalHours(
      goalID,
      this.weekDates[dayIndex] as number,
      hrs
    );
    this.dispatchLoadMonthInfo(false);
  }
}
