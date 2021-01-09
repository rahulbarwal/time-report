import { createReducer, on, Store } from '@ngrx/store';
import { addMonthInfoToStoreAction } from '../actions/goalsData.action';
import { IGoalDataState, IMonthInfo } from '../state/goalsData.state';

const initialState: IGoalDataState = {
  months: new Map<string, IMonthInfo>(),
};

export const goalsDataReducer = createReducer(
  initialState,
  on(addMonthInfoToStoreAction, addMonthInfoReducer)
  // on(getMonthInfoToStoreAction, null),
  // on(getMonthGoalsToStoreAction, null),
  // on(getMonthGoalsPerDayDayaToStoreAction, null)
);

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
  };
}

function getMonthInfoToStoreAction(
  store: IGoalDataState,
  { mottoOfMonth }: { mottoOfMonth: string }
): IGoalDataState {
  return {
    ...store,
  };
}
