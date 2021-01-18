import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { WeekViewRoutingModule } from './week-view-routing.module';
import { WeekTargetsComponent } from './components/week-targets/week-targets.component';
import { TargetsTableComponent } from './components/targets-table/targets-table.component';
import { DateTimeService } from './services/date-time/date-time.service';
import { TargetsDbService } from './services/targets-db/targets-db.service';
import {
  GOALS_DATA_FEATURE_KEY,
  IGoalDataState,
} from './redux/state/goalsData.state';
import { StoreModule } from '@ngrx/store';
import { goalsDataReducer } from './redux/reducer/goalsData.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GoalsDataEffects } from './redux/effects/goalsData.effects';
import { MonthGoalsComponent } from './components/month-goals/month-goals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoalsListComponent } from './components/month-goals/goals-list/goals-list.component';
@NgModule({
  declarations: [
    WeekTargetsComponent,
    TargetsTableComponent,
    MonthGoalsComponent,
    GoalsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WeekViewRoutingModule,
    AngularFirestoreModule,
    StoreModule.forFeature<IGoalDataState>(
      GOALS_DATA_FEATURE_KEY,
      goalsDataReducer
    ),
    EffectsModule.forFeature([GoalsDataEffects]),
  ],
  exports: [],
  providers: [DateTimeService, TargetsDbService],
})
export class WeekViewModule {}
