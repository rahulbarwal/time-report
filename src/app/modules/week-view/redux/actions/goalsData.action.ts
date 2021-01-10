import { createAction, props } from '@ngrx/store';
import { IMonthInfo } from '../state/goalsData.state';

const loadMonthInfoToFromDBAction = createAction(
  '[MonthInfo] Load month data from DB',
  props<{ monthName: string; weekDates: string[]; loading: boolean }>()
);

const addMonthInfoToStoreAction = createAction(
  '[MonthInfo] Add new month data',
  props<{ monthName: string; data: IMonthInfo }>()
);
const emptyMonthInfoAction = createAction(
  '[MonthInfo] Empty month data',
  props<{ monthName: string }>()
);

export {
  loadMonthInfoToFromDBAction,
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
};
