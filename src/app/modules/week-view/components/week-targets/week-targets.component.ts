import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { loadMonthInfoToFromDBAction } from '../../redux/actions/goalsData.action';
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
  weekDates!: string[];

  constructor(
    private store: Store<IGoalDataState>,
    private _dateService: DateTimeService
  ) {
    this.currentMonth = this._dateService.currentMonthName;
    this.weekDates = this._dateService.getValidWeekDaysList();
    this.weekTitles = this.initializeWeekTitles();

    this.store.dispatch(
      loadMonthInfoToFromDBAction({
        monthName: this.currentMonth,
        loading: true,
        weekDates: this.weekDates,
      })
    );
  }

  initializeWeekTitles(): string[] {
    const monthShort = this.currentMonth.substring(0, 3);
    return [
      'Goals',
      ...this.weekDates.map((date) =>
        date.length ? `${date} ${monthShort}` : ''
      ),
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
}
