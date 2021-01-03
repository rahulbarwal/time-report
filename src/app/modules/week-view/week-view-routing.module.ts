import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekTargetsComponent } from './components/week-targets/week-targets.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WeekTargetsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekViewRoutingModule {}
