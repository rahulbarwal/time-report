import { createAction, props } from '@ngrx/store';
import { IMonthInfo } from './goalsData.state';

const updateCurrentWeekStartDateAction = createAction(
  '[MonthInfo] Update Current week start date',
  props<{
    currentWeekStartDate: number;
  }>()
);

const loadWeekDataToFromDBAction = createAction(
  '[MonthInfo] Load week data from DB',
  props<{
    year?: number;
    month?: string;
    loading?: boolean;
    weekStartDate: number;
  }>()
);

const addMonthInfoToStoreAction = createAction(
  '[MonthInfo] Add new month data',
  props<{ monthName: string; data: IMonthInfo }>()
);

const emptyMonthInfoAction = createAction(
  '[MonthInfo] Empty month data',
  props<{ monthName: string }>()
);

const updateGoalHrsForTodayAction = createAction(
  '[MonthInfo] Update month per day data',
  props<{ goalID: string; day: number; hrs: number }>()
);

const saveMonthInfoToDBAction = createAction(
  '[MonthInfo] Save to DB',
  props<{ motto: string; goals: string[] }>()
);

const saveMonthInfoToDBFailAction = createAction(
  '[MonthInfo] Save to DB failed',
  props<{ monthName: string }>()
);

const saveMonthInfoToDBSuccessAction = createAction(
  '[MonthInfo] Save to DB successfull',
  props<{ monthName: string }>()
);

export {
  updateCurrentWeekStartDateAction,
  loadWeekDataToFromDBAction,
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  updateGoalHrsForTodayAction,
  saveMonthInfoToDBAction,
  saveMonthInfoToDBFailAction,
  saveMonthInfoToDBSuccessAction,
};
