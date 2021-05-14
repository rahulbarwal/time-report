import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
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
  disablePrev?: boolean;
  disableNext?: boolean;
  isAnyDataAvailableForCurrentMonth?: boolean;
  constructor(
    private store: Store<IGoalDataState>,
    private _targetDB: TargetsDbService
  ) { }

  ngOnInit(): void {
    this.monthInfo$ = this.store.select(getMonthsMapSelector).pipe(
      map((months) => {
        const monthData = months.get(this.currentMonth);
        this.isAnyDataAvailableForCurrentMonth = !(monthData === null);
        return monthData;
      })
    );
    this.loading$ = this.store.select(getDataLoadingSelector);
    this.currentWeekSubscription = this.store
      .select(getCurrentSundaySelector)
      .pipe(filter((val) => !!val),
        map(val => {
          this.currentWeekStartDate = val as number;
          this.updateComponentDateVars();
        }))
      .subscribe((val) => {
        this.monthInfo$.pipe(
          take(1)
        ).subscribe((monthData) => {
          if (!(this.isAnyDataAvailableForCurrentMonth && monthData?.weeksAvailable.includes(this.currentWeekStartDate))) {
            console.log("🚀 ~ this.monthInfo$.subscribe ~ this.currentWeekStartDate", this.currentWeekStartDate)
            this.dispatchLoadMonthInfo(true);
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

    this.disableNext = DateTimeService.isLastWeek(this.weekDates[this.weekDates.length - 1])
    this.disablePrev = DateTimeService.isFirstWeek(this.weekDates[0])
  }

  dispatchLoadMonthInfo(setLoading = true) {
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
