import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  loadMonthInfoToFromDBAction,
  updateCurrentWeekStartDateAction,
} from '../../redux/actions/goalsData.action';
import {
  getCurrentSundaySelector,
  getDataLoadingSelector,
  getMonthsMapSelector,
  IGoalDataState,
  IMonthInfo,
  IMonthInfoState,
} from '../../redux/state/goalsData.state';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';

@Component({
  selector: 'app-week-targets',
  templateUrl: './week-targets.component.html',
  styleUrls: ['./week-targets.component.scss'],
})
export class WeekTargetsComponent implements OnInit, OnDestroy {
  loading$!: Observable<boolean>;
  monthInfo$!: Observable<IMonthInfoState | null | undefined>;
  currentMonth!: string;
  weekTitles!: string[];
  weekDates!: number[];
  currentDayIndex!: number;
  currentWeekStartDate!: number;
  currentWeekSubscription!: Subscription;
  constructor(
    private store: Store<IGoalDataState>,
    private _targetDB: TargetsDbService
  ) {}

  ngOnInit(): void {
    this.monthInfo$ = this.store.select(getMonthsMapSelector).pipe(
      map((months) => {
        return months.get(this.currentMonth);
      })
    );
    this.loading$ = this.store.select(getDataLoadingSelector);
    this.currentWeekSubscription = this.store
      .select(getCurrentSundaySelector)
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        this.currentWeekStartDate = val as number;
        this.updateComponentDateVars();
        this.monthInfo$.subscribe((monthData) => {
          if (!monthData?.weeksAvailable.includes(this.currentWeekStartDate)) {
            this.dispatchLoadMonthInfo(true, this.currentWeekStartDate);
          }
        });
      });
  }

  ngOnDestroy() {
    this.currentWeekSubscription.unsubscribe();
  }

  updateComponentDateVars() {
    this.currentMonth = DateTimeService.currentMonthName;
    this.weekDates = DateTimeService.getValidWeekDaysList(
      this.currentWeekStartDate
    );
    this.weekTitles = this.initializeWeekTitles();
    this.currentDayIndex = this.weekDates.findIndex(
      (date) => date === DateTimeService.today.getDate()
    );
  }

  dispatchLoadMonthInfo(setLoading = true, currentWeekSunday?: number) {
    this.store.dispatch(
      loadMonthInfoToFromDBAction({
        year: DateTimeService.currentYear,
        month: this.currentMonth,
        loading: setLoading,
        weekStartDate: this.currentWeekStartDate,
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

  async setHoursForGoal({
    goalID,
    dayIndex,
    hrs,
  }: {
    goalID: string;
    dayIndex: number;
    hrs: number;
  }) {
    await this._targetDB.updateGoalHours({
      year: DateTimeService.currentYear,
      monthName: DateTimeService.currentMonthName,
      day: this.weekDates[dayIndex] as number,
      goalID,
      hrs,
    });
    this.dispatchLoadMonthInfo(false);
  }

  loadPrevWeek() {
    this.changeWeeksData(false);
  }

  loadNextWeek() {
    this.changeWeeksData();
  }

  changeWeeksData(next = true) {
    this.dispatchUpdateCurrentWeekDate(
      next ? this.currentWeekStartDate + 7 : this.currentWeekStartDate - 7
    );
  }

  private dispatchUpdateCurrentWeekDate(currentWeekStartDate: number) {
    this.store.dispatch(
      updateCurrentWeekStartDateAction({
        currentWeekStartDate,
      })
    );
  }

  jumpToToday() {
    this.dispatchUpdateCurrentWeekDate(DateTimeService.lastSunday.getDate());
  }
}
