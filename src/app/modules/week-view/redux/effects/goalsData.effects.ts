import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadMonthInfoToFromDBAction,
  saveMonthInfoToDBAction,
  saveMonthInfoToDBFailAction,
  saveMonthInfoToDBSuccessAction,
} from '../actions/goalsData.action';
import { IGoalDataState, IMonthInfo } from '../state/goalsData.state';

@Injectable()
export class GoalsDataEffects {
  constructor(
    private _targetsDB: TargetsDbService,
    private _actions$: Actions,
    private _store: Store<IGoalDataState>
  ) { }

  @Effect()
  loadMonthData$ = this._actions$.pipe(
    ofType(loadMonthInfoToFromDBAction),
    switchMap((action) =>
      this._targetsDB
        .getMonthGoalsData({
          year: action.year,
          monthName: action.month,
          weekStartDate: action.weekStartDate,
        })
        .pipe(
          concatMap((info: IMonthInfo) =>
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

  @Effect()
  saveMonthToDB$ = this._actions$.pipe(
    ofType(saveMonthInfoToDBAction),
    switchMap((action) =>
      this._targetsDB
        .saveMonthGoals({ motto: action.motto, goals: action.goals })
        .pipe(
          concatMap((_) => of(saveMonthInfoToDBSuccessAction())),
          catchError((e) => {
            if (e === 'SaveFail') {
              return of(saveMonthInfoToDBFailAction());
            }
            return throwError(e);
          })
        )
    )
  );
}
