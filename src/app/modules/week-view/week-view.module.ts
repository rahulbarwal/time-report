import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekViewRoutingModule } from './week-view-routing.module';
import { WeekTargetsComponent } from './components/week-targets/week-targets.component';
import { TargetsTableComponent } from './components/targets-table/targets-table.component';

@NgModule({
  declarations: [WeekTargetsComponent, TargetsTableComponent],
  imports: [CommonModule, WeekViewRoutingModule],
  exports: [],
})
export class WeekViewModule {}
