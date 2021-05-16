import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IAppState, userInfoSelector } from 'src/app/redux/state/app.state';
import { IGoalDataState } from '../../redux/goalsData.state';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';

@Injectable()
export class GoalsCreateGuard implements CanActivate {
  constructor(private _targetDB: TargetsDbService,
    private _router: Router,
    private _store: Store<IAppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._store.select(userInfoSelector)
      .pipe(
        take(1),
        switchMap(info =>
          this._targetDB.isMonthGoalsStored(info.id).pipe(
            map((val) => {
              if (val) {
                return this._router.parseUrl('/month-info/week-targets');
              }
              return true;
            })
          )
        ))
  }
}
