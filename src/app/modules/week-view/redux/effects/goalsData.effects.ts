import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, of, throwError } from 'rxjs';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadMonthInfoToFromDBAction,
  updateGoalHrsForTodayAction,
} from '../actions/goalsData.action';

@Injectable()
export class GoalsDataEffects {
  constructor(
    private _targetsDB: TargetsDbService,
    private _actions$: Actions
  ) {}

  @Effect()
  loadMonthData$ = this._actions$.pipe(
    ofType(loadMonthInfoToFromDBAction),
    switchMap((action) =>
      this._targetsDB
        .getMonthGoalsData(action.year, action.month, action.weekDates)
        .pipe(
          concatMap((info) =>
            of(
              addMonthInfoToStoreAction({
                monthName: action.month as string,
                data: info,
              })
            )
          ),
          catchError((e) => {
            if (e === 'EmptyMonth') {
              return of(
                emptyMonthInfoAction({ monthName: action.month as string })
              );
            }
            return throwError(e);
          })
        )
    )
  );
}
