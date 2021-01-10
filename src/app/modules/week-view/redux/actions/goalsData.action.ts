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

const getMonthInfoToStoreAction = createAction(
  '[MonthInfo] Get particular month data',
  props<{ mottoOfMonth: string }>()
);
const getMonthGoalsToStoreAction = createAction(
  '[MonthInfo->Goals] Get particular month data',
  props<{ monthName: string; data: IMonthInfo }>()
);
const getMonthGoalsPerDayDayaToStoreAction = createAction(
  '[MonthInfo->Goals->Per day data] Get particular month data',
  props<{ monthName: string; data: IMonthInfo }>()
);

export {
  loadMonthInfoToFromDBAction,
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  getMonthInfoToStoreAction,
  getMonthGoalsToStoreAction,
  getMonthGoalsPerDayDayaToStoreAction,
};
