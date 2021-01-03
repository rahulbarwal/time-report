import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'week-targets', pathMatch: 'full' },
  {
    path: 'week-targets',
    loadChildren: () =>
      import('./modules/week-view/week-view.module').then(
        (m) => m.WeekViewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
