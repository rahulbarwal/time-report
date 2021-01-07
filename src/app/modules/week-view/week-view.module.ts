import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { WeekViewRoutingModule } from './week-view-routing.module';
import { WeekTargetsComponent } from './components/week-targets/week-targets.component';
import { TargetsTableComponent } from './components/targets-table/targets-table.component';
import { DateTimeService } from './services/date-time/date-time.service';
import { TargetsDbService } from './services/targets-db/targets-db.service';

@NgModule({
  declarations: [WeekTargetsComponent, TargetsTableComponent],
  imports: [CommonModule, WeekViewRoutingModule, AngularFirestoreModule],
  exports: [],
  providers: [DateTimeService, TargetsDbService],
})
export class WeekViewModule {}
