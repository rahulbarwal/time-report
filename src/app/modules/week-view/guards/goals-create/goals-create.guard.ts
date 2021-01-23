import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';

@Injectable()
export class GoalsCreateGuard implements CanActivate {
  constructor(private _targetDB: TargetsDbService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._targetDB.isMonthGoalsStored().pipe(
      map((val) => {
        if (val) {
          return this._router.parseUrl('/month-info/week-targets');
        }
        return true;
      })
    );
  }
}
