import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { catchError, concatMap, filter, switchMap, take } from 'rxjs/operators';
import { IAppState, userInfoSelector } from 'src/app/redux/state/app.state';
import { DateTimeService } from '../services/date-time/date-time.service';
import { TargetsDbService } from '../services/targets-db/targets-db.service';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadWeekDataToFromDBAction,
  saveMonthInfoToDBAction,
  saveMonthInfoToDBFailAction,
  saveMonthInfoToDBSuccessAction
} from './goalsData.action';
import { IMonthInfo } from './goalsData.state';

@Injectable()
export class GoalsDataEffects {
  constructor(
    private _targetsDB: TargetsDbService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) { }

  @Effect()
  loadMonthData$ = this._actions$.pipe(
    ofType(loadWeekDataToFromDBAction),
    switchMap(action => this._store.select(userInfoSelector)
      .pipe(
        filter(val => !!val),
        take(1),
        switchMap(
          user => this._targetsDB
            .getMonthGoalsData({
              userId: user.id,
              year: action.year,
              monthName: action.month,
              weekStartDate: action.weekStartDate,
            }).pipe(switchMap((info: IMonthInfo) =>
              of(
                addMonthInfoToStoreAction({
                  monthName: action.month as string,
                  data: info,
                }))
            ), catchError(
              e => {
                if (e === 'EmptyMonth') {
                  return of(
                    emptyMonthInfoAction({ monthName: action.month as string })
                  );
                }
                return throwError(e);
              })
            )
        ))
    )
  );

  @Effect()
  saveMonthToDB$ = this._actions$.pipe(
    ofType(saveMonthInfoToDBAction),
    switchMap((action) => this._store.select(userInfoSelector)
      .pipe(
        filter(val => !!val),
        take(1),
        switchMap(
          user => {
            const year = DateTimeService.currentYear;
            const monthName = DateTimeService.currentMonthName;

            return this._targetsDB
              .saveMonthGoals({ year, monthName, userId: user.id, motto: action.motto, goals: action.goals })
              .pipe(
                concatMap((_) => of(saveMonthInfoToDBSuccessAction({ monthName }))),
                catchError((e) => {
                  if (e === 'SaveFail') {
                    return of(saveMonthInfoToDBFailAction({ monthName }));
                  }
                  return throwError(e);
                })
              )
          }
        )))
  );
}
