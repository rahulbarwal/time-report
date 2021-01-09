import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { concatMap, exhaustMap } from 'rxjs/operators';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';
import {
  addMonthInfoToStoreAction,
  loadMonthInfoToFromDBAction,
} from '../actions/goalsData.action';

@Injectable()
export class GoalsDataEffects {
  constructor(
    private _targetsDB: TargetsDbService,
    private actions$: Actions
  ) {}

  @Effect()
  loadMonthData$ = this.actions$.pipe(
    ofType(loadMonthInfoToFromDBAction),
    exhaustMap((action) =>
      this._targetsDB.getMonthGoalsData().pipe(
        concatMap((info) =>
          of(
            addMonthInfoToStoreAction({
              monthName: action.monthName,
              data: info,
            })
          )
        )
      )
    )
  );
}
