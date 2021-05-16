import { createReducer, on } from '@ngrx/store';
import { DateTimeService } from '../services/date-time/date-time.service';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadWeekDataToFromDBAction,
  saveMonthInfoToDBFailAction,
  saveMonthInfoToDBSuccessAction,
  updateCurrentWeekStartDateAction
} from './goalsData.action';
import {
  IGoalDataState,
  IMonthInfo,
  IMonthInfoState
} from './goalsData.state';

const initialState: IGoalDataState = {
  months: new Map(),
  dataLoading: false,
  saveError: null,
  dataSaved: null,
  currentWeekSundayDate: null,
};

export const goalsDataReducer = createReducer(
  initialState,
  on(updateCurrentWeekStartDateAction, updateCurrentWeekStartDate),
  on(loadWeekDataToFromDBAction, setLoading),
  on(addMonthInfoToStoreAction, addMonthInfoReducer),
  on(emptyMonthInfoAction, addEmptyMonthInfoToStore),
  on(saveMonthInfoToDBSuccessAction, monthInfoSaveSuccess),
  on(saveMonthInfoToDBFailAction, monthInfoSaveFail)
);

function updateCurrentWeekStartDate(
  store: IGoalDataState,
  {
    currentWeekStartDate,
  }: {
    currentWeekStartDate: number;
  }
): IGoalDataState {
  return {
    ...store,
    currentWeekSundayDate: currentWeekStartDate,
  };
}
function setLoading(
  store: IGoalDataState,
  {
    loading,
  }: {
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
  const monthsMapFromStore = new Map<string, IMonthInfoState>(
    JSON.parse(JSON.stringify(Array.from(store.months)))
  );
  const newData: IMonthInfoState = JSON.parse(JSON.stringify(data));
  newData.goals.forEach((goal) => {
    let perDayData;
    if (monthsMapFromStore.has(monthName) && monthsMapFromStore.get(monthName) !== null) {
      const existingData = monthsMapFromStore
        .get(monthName)
        ?.goals.find((g) => g.id === goal.id);
      perDayData = existingData?.perDayData || [];
    } else {
      perDayData = new Array(DateTimeService.getDaysInMonth());
    }
    perDayData.splice(
      (store.currentWeekSundayDate as number) - 1,
      goal.perDayData.length,
      ...goal.perDayData
    );
    goal.perDayData = perDayData;
  });
  if (monthsMapFromStore.has(monthName) && monthsMapFromStore.get(monthName) !== null) {
    newData.weeksAvailable = monthsMapFromStore.get(monthName)?.weeksAvailable || [];

    newData.weeksAvailable.push((store.currentWeekSundayDate as number));
  } else {
    newData.weeksAvailable = [(store.currentWeekSundayDate as number)];
  }
  monthsMapFromStore.set(monthName, newData);

  return {
    ...store,
    months: monthsMapFromStore,
    dataLoading: false,
  };
}

function addEmptyMonthInfoToStore(
  store: IGoalDataState,
  { monthName }: { monthName: string }
): IGoalDataState {
  const monthsMap = new Map<string, IMonthInfoState | null>(
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
  const monthsMapFromStore = new Map<string, IMonthInfoState | null>(
    JSON.parse(JSON.stringify(Array.from(store.months)))
  );
  monthsMapFromStore.set('May', null);
  return {
    ...store,
    saveError: 'Failed to save month info',
    dataSaved: false,
  };
}

function monthInfoSaveSuccess(store: IGoalDataState): IGoalDataState {
  const monthsMapFromStore = new Map<string, IMonthInfoState | undefined>(
    JSON.parse(JSON.stringify(Array.from(store.months)))
  );
  monthsMapFromStore.set('May', undefined);

  return {
    ...store,
    months: monthsMapFromStore,
    saveError: '',
    dataSaved: true,
  };
}
