import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IGoalInfo, IMonthInfo } from '../../redux/state/goalsData.state';
import { DateTimeService } from '../date-time/date-time.service';

@Injectable()
export class TargetsDbService {
  getYearPath(year: number) {
    return `targets-${year}`;
  }

  constructor(
    private _firestore: FirestoreService,
    private _dateTime: DateTimeService
  ) {}

  getMonthGoalsData(
    year?: number,
    month?: string,
    weekDates?: (number | null)[]
  ) {
    month = month || this._dateTime.currentMonthName;
    year = year || this._dateTime.today.getFullYear();
    weekDates = weekDates || this._dateTime.getValidWeekDaysList();

    const yearPath = this.getYearPath(year);

    let monthInfo: IMonthInfo;
    return this._firestore
      .getCollectionRef(yearPath)
      .doc(month)
      .get()
      .pipe(
        mergeMap((month_db) => {
          if (month_db.exists) {
            monthInfo = {
              mottoOfMonth: (month_db.data() as IMonthInfo).mottoOfMonth,
              goals: [],
            };

            return this._firestore
              .getCollectionRef(`${yearPath}/${month}/goals`)
              .get();
          } else {
            return throwError('EmptyMonth');
          }
        }),
        mergeMap((goalsCollection) => {
          let goals: IGoalInfo[] = [];
          goalsCollection.docs.forEach((doc) => {
            const goal: IGoalInfo = {
              id: doc.id,
              title: (doc.data() as IGoalInfo).title,
              perDayData: [],
            };
            const perDayData: {
              [key: string]: number;
            } = (doc.data() as {
              perDayData: {
                [key: string]: number;
              };
            }).perDayData;

            weekDates?.forEach(async (day) => {
              if (day !== null) {
                const found = perDayData.hasOwnProperty(day);
                if (found) {
                  goal.perDayData?.push(perDayData[day]);
                } else {
                  goal.perDayData?.push(null);
                }
              }
            });
            goals.push(goal);
          });
          monthInfo.goals = goals;
          return of(monthInfo);
        })
      );
  }

  updateGoalHours(goalID: string, day: number, hrs: number) {
    const monthName = this._dateTime.currentMonthName;
    const year = this._dateTime.currentYear;

    const objToUpdate: { [key: string]: number } = {};
    objToUpdate[`perDayData.${day}`] = hrs;
    return this._firestore
      .getCollectionRef(`${this.getYearPath(year)}/${monthName}/goals`)
      .doc(goalID)
      .update(objToUpdate);
  }
}
