import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state/app.state';

const GOALS_DATA_FEATURE_KEY = 'goalsData';
interface IGoalInfo {
  id: string;
  title: string;
  perDayData: (number | null | undefined)[];
}

interface IMonthInfo {
  mottoOfMonth?: string;
  monthTitle?: string;
  goals: IGoalInfo[];
}

interface IMonthInfoState extends IMonthInfo {
  weeksAvailable: number[];
}

interface IGoalDataState {
  /**
   * months state
   * 1. IMonthInfoState: actual data
   * 2. undefined: we do not know yet, it can be there or not
   * 3. null: not found in DB, user needs to create it
   */
  months: Map<string, IMonthInfoState | null | undefined>;
  dataLoading: boolean;
  saveError: string | null;
  dataSaved: boolean | null;
  currentWeekSundayDate: number | null;
}

const getGoalDataSelector = createFeatureSelector<IGoalDataState>(
  GOALS_DATA_FEATURE_KEY
);

const getMonthsMapSelector = createSelector(
  getGoalDataSelector,
  (state) => state.months
);

const getSpecificMonthsDataSelector = createSelector(
  getMonthsMapSelector,
  (months: Map<string, IMonthInfoState | null | undefined>, props: { monthName: string }) => {
    return months.get(props.monthName);
  }
);

const getDataLoadingSelector = createSelector(
  getGoalDataSelector,
  (state) => state.dataLoading
);

const getSaveErrorSelector = createSelector(
  getGoalDataSelector,
  (state) => state.saveError
);

const getSavedSelector = createSelector(
  getGoalDataSelector,
  (state) => state.dataSaved
);

const getCurrentSundaySelector = createSelector(
  getGoalDataSelector,
  (state) => state.currentWeekSundayDate
);

export {
  IGoalInfo,
  IMonthInfo,
  IMonthInfoState,
  IGoalDataState,
  IAppState,
  getMonthsMapSelector,
  getDataLoadingSelector,
  GOALS_DATA_FEATURE_KEY,
  getSaveErrorSelector,
  getSavedSelector,
  getCurrentSundaySelector,
  getSpecificMonthsDataSelector
};
