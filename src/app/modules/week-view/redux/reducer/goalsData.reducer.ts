import { createReducer, on, Store } from '@ngrx/store';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadMonthInfoToFromDBAction,
} from '../actions/goalsData.action';
import { IGoalDataState, IMonthInfo } from '../state/goalsData.state';

const initialState: IGoalDataState = {
  months: new Map(),
  dataLoading: false,
};

export const goalsDataReducer = createReducer(
  initialState,
  on(loadMonthInfoToFromDBAction, setLoading),
  on(addMonthInfoToStoreAction, addMonthInfoReducer),
  on(emptyMonthInfoAction, addEmptyMonthInfoToStore)
  // on(getMonthInfoToStoreAction, null),
  // on(getMonthGoalsToStoreAction, null),
  // on(getMonthGoalsPerDayDayaToStoreAction, null)
);

function setLoading(
  store: IGoalDataState,
  { loading }: { loading: boolean }
): IGoalDataState {
  return {
    ...store,
    dataLoading: loading,
  };
}

function addMonthInfoReducer(
  store: IGoalDataState,
  { monthName, data }: { monthName: string; data: IMonthInfo }
): IGoalDataState {
  const monthsMap = new Map<string, IMonthInfo>(
    JSON.parse(JSON.stringify(Array.from(store.months)))
  );
  monthsMap.set(monthName, data);
  return {
    ...store,
    months: monthsMap,
    dataLoading: false,
  };
}

function addEmptyMonthInfoToStore(
  store: IGoalDataState,
  { monthName }: { monthName: string }
): IGoalDataState {
  const monthsMap = new Map<string, IMonthInfo | null>(
    JSON.parse(JSON.stringify(Array.from(store.months)))
  );
  monthsMap.set(monthName, null);
  return {
    ...store,
    months: monthsMap,
    dataLoading: false,
  };
}
