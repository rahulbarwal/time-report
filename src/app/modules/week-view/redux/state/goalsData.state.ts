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

interface IGoalDataState extends IAppState {
  months: Map<string, IMonthInfoState | null>;
  dataLoading: boolean;
  saveError: string | null;
  dataSaved: boolean | null;
  currentWeekSundayDate: number;
}

const getGoalDataSelector = createFeatureSelector<IGoalDataState>(
  GOALS_DATA_FEATURE_KEY
);

const getMonthsMapSelector = createSelector(
  getGoalDataSelector,
  (state) => state.months
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
};
