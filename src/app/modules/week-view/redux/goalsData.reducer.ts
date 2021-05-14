import { createReducer, on } from '@ngrx/store';
import { DateTimeService } from '../services/date-time/date-time.service';
import {
  addMonthInfoToStoreAction,
  emptyMonthInfoAction,
  loadMonthInfoToFromDBAction,
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
  months: new Map<string, IMonthInfoState>(),
  dataLoading: false,
  saveError: null,
  dataSaved: null,
  currentWeekSundayDate: null,
};

export const goalsDataReducer = createReducer(
  initialState,
  on(updateCurrentWeekStartDateAction, updateCurrentWeekStartDate),
  on(loadMonthInfoToFromDBAction, setLoading),
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
  const monthsMap = new Map<string, IMonthInfoState>(
    JSON.parse(JSON.stringify(Array.from(store.months)))
  );
  const newData: IMonthInfoState = JSON.parse(JSON.stringify(data));
  newData.goals.forEach((goal) => {
    let perDayData;
    if (monthsMap.has(monthName) && monthsMap.get(monthName) !== null) {
      const existingData = monthsMap
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
  if (monthsMap.has(monthName) && monthsMap.get(monthName) !== null) {
    newData.weeksAvailable = monthsMap.get(monthName)?.weeksAvailable || [];

    newData.weeksAvailable.push((store.currentWeekSundayDate as number));
  } else {
    newData.weeksAvailable = [(store.currentWeekSundayDate as number)];
  }
  monthsMap.set(monthName, newData);

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
