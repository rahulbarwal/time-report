import { createReducer, on, Store } from '@ngrx/store';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadMonthInfoToFromDBAction,
  saveMonthInfoToDBAction,
  saveMonthInfoToDBFailAction,
  saveMonthInfoToDBSuccessAction,
} from '../actions/goalsData.action';
import { IGoalDataState, IMonthInfo } from '../state/goalsData.state';

const initialState: IGoalDataState = {
  months: new Map(),
  dataLoading: false,
  saveError: null,
  dataSaved: null,
};

export const goalsDataReducer = createReducer(
  initialState,
  on(loadMonthInfoToFromDBAction, setLoading),
  on(addMonthInfoToStoreAction, addMonthInfoReducer),
  on(emptyMonthInfoAction, addEmptyMonthInfoToStore),
  on(saveMonthInfoToDBSuccessAction, monthInfoSaveSuccess),
  on(saveMonthInfoToDBFailAction, monthInfoSaveFail)
);

function setLoading(
  store: IGoalDataState,
  {
    loading,
  }: {
    year?: number;
    month?: string;
    weekDates?: (number | null)[];
    loading?: boolean;
  }
): IGoalDataState {
  return {
    ...store,
    dataLoading: loading || false,
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

function monthInfoSaveFail(store: IGoalDataState): IGoalDataState {
  return {
    ...store,
    saveError: 'Failed to save month info',
    dataSaved: false,
  };
}

function monthInfoSaveSuccess(store: IGoalDataState): IGoalDataState {
  return {
    ...store,
    saveError: '',
    dataSaved: true,
  };
}
