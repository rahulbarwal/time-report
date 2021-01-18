import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthGoalsComponent } from './components/month-goals/month-goals.component';
import { WeekTargetsComponent } from './components/week-targets/week-targets.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'week-targets' },
  { path: 'week-targets', component: WeekTargetsComponent },
  { path: 'goals', component: MonthGoalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekViewRoutingModule {}
