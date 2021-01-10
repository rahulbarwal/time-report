import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, concatMap, exhaustMap } from 'rxjs/operators';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
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
      this._targetsDB.getMonthGoalsData(action.weekDates).pipe(
        concatMap((info) => {
          console.log(
            '🚀 ~ file: goalsData.effects.ts ~ line 24 ~ GoalsDataEffects ~ concatMap ~ info',
            info
          );
          return of(
            addMonthInfoToStoreAction({
              monthName: action.monthName,
              data: info,
            })
          );
        }),
        catchError((e) => {
          if (e === 'EmptyMonth') {
            return of(emptyMonthInfoAction({ monthName: action.monthName }));
          }
          return throwError(e);
        })
      )
    )
  );
}
