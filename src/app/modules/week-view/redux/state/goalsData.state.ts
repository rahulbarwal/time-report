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
  goals?: IGoalInfo[];
}

export { IGoalInfo, IMonthInfo };

interface IGoalDataState extends IAppState {
  months: Map<string, IMonthInfo>;
}

const getGoalDataSelector = createFeatureSelector<IGoalDataState>(
  GOALS_DATA_FEATURE_KEY
);

const getMonthsMapSelector = createSelector(
  getGoalDataSelector,
  (state) => state.months
);

export {
  IGoalDataState,
  IAppState,
  getMonthsMapSelector,
  GOALS_DATA_FEATURE_KEY,
};
