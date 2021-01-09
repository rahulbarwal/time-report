import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { loadMonthInfoToFromDBAction } from '../../redux/actions/goalsData.action';
import {
  getMonthsMapSelector,
  IGoalDataState,
  IMonthInfo,
} from '../../redux/state/goalsData.state';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';

@Component({
  selector: 'app-week-targets',
  templateUrl: './week-targets.component.html',
  styleUrls: ['./week-targets.component.scss'],
})
export class WeekTargetsComponent implements OnInit {
  monthInfo$!: Observable<IMonthInfo | undefined>;

  constructor(private store: Store<IGoalDataState>) {
    this.store.dispatch(loadMonthInfoToFromDBAction({ monthName: 'January' }));
  }

  ngOnInit(): void {
    this.monthInfo$ = this.store.select(getMonthsMapSelector).pipe(
      map((months) => {
        return months.get('January');
      })
    );
  }
}
