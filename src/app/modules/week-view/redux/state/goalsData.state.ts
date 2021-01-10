import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/redux/state/app.state';

const GOALS_DATA_FEATURE_KEY = 'goalsData';
interface IGoalInfo {
  id: string;
  title: string;
  perDayData?: (number | null | undefined)[];
}

interface IMonthInfo {
  mottoOfMonth?: string;
  monthTitle?: string;
  goals: IGoalInfo[];
}

interface IGoalDataState extends IAppState {
  months: Map<string, IMonthInfo | null>;
  dataLoading: boolean;
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

export {
  IGoalInfo,
  IMonthInfo,
  IGoalDataState,
  IAppState,
  getMonthsMapSelector,
  getDataLoadingSelector,
  GOALS_DATA_FEATURE_KEY,
};
