import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DateTimeService } from '../../services/date-time/date-time.service';

@Injectable({
  providedIn: 'root'
})
export class WeekTargetStartWeekDateGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const startWeekDate = route.queryParamMap.get('startWeekDate');
    if (startWeekDate) {
      const date = DateTimeService.constructCurrentMonthDateFromDateNum(parseInt(startWeekDate));
      if (date.getDay() === 0) {
        return true;
      } else {
        this._router.navigate([], {
          queryParams: {
            startWeekDate: DateTimeService.lastSunday.getDate()
          },
        })
        return false;
      }
    }
    return true;
  }

}
