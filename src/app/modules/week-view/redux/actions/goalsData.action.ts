import { createAction, props } from '@ngrx/store';
import { IMonthInfo } from '../state/goalsData.state';

const loadMonthInfoToFromDBAction = createAction(
  '[MonthInfo] Load month data from DB',
  props<{
    year?: number;
    month?: string;
    weekDates?: (number | null)[];
    loading?: boolean;
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

export {
  loadMonthInfoToFromDBAction,
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  updateGoalHrsForTodayAction,
};
